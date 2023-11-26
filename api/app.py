import os
import json
import base64
from datetime import datetime
import urllib
from PyPDF2 import PdfReader

from flask import Flask,request,jsonify, send_file
from flask_cors import CORS, cross_origin

from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import HuggingFaceHub
from langchain.vectorstores import Chroma 
import openai

app = Flask(__name__)
cors = CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})

api_key=""
openai.api_key=api_key
os.environ["OPENAI_API_KEY"] = api_key

@app.route('/')
@cross_origin(support_credentials=True)
def hello():
    return "Welcome to MedaLexa Service"

def get_pdf_text(pdf_files):    
    text = ""
    for row in pdf_files:
        pdf_reader = PdfReader(row)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=2000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vectorstore):
    llm = ChatOpenAI(temperature=0.2,model_name='gpt-3.5-turbo')
    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory,
    )
    return conversation_chain

@app.route('/getanswer',methods=["POST"])
def getanswer():
    user_queries=json.loads(request.form['user_question'])
    file_name=[]
    for file in  request.files.getlist('file'):
        file_name.append(file.filename)
        file.save(file.filename)
    all_result=[]
    i=1
    pdf_text=get_pdf_text(file_name)
    print(len(pdf_text))
    print(pdf_text)
    text_chunks=get_text_chunks(pdf_text)
    vectorstore=get_vectorstore(text_chunks)
    response=get_conversation_chain(vectorstore)
    print(response)
    for user_query in user_queries:
        if user_query['checked']:
            print("-------------------------------")
            question=user_query['prompt']
            
            result = response({"question": question})
            all_result.append({'prompt':question,'answer':result['answer'],'question_no':i})
        i=i+1
    return {'status':'success','data':all_result}

@app.route('/get_pdf_file',methods=["GET"])
def get_pdf_file():
    file_name=request.args.get('file_name')
    with open(file_name,"rb") as pdf_file:
        encoded_string=base64.b64encode(pdf_file.read()).decode('utf-8')
    return jsonify({'status':'success','pdf_file':encoded_string})


@app.route('/getpatientsummary', methods=['POST'])
def generatePatientSummary():
    user_queries=request.form['user_question']
    table_string = ',\n'.join([str(data) for data in table_data])
    print(table_string)
    prompt_answer=get_chatgpt_response1(table_string, user_queries)
    print(prompt_answer)
    return {'status':'success','data':prompt_answer}


@app.route('/getpatientdiagnosis', methods=['POST'])
def generatePatientDiagnosis():
    user_queries=request.form['user_question']
    table_string = "Please help is suggesting what should the patient do next"
    prompt_answer=get_chatgpt_response1(table_string, user_queries)
    print(prompt_answer)
    return {'status':'success','data':prompt_answer}



def get_chatgpt_response1(message, query):
    try:
        print("Inside GPT 3.5 turbo")
        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",max_tokens=1024, temperature=0,messages=[{"role": "system", "content": query},
                                             {
                                                 "role": "user", "content": message
                                             },]
        )
        reply = chat.choices[0].message.content
        return reply
    except Exception as e:
        print(e)
        print("Inside Exception")
        return str(e)

@app.route('/generateIdeaDetails', methods=['GET'])
@cross_origin(support_credentials=True)
def generateIdeaDetails():
    ideaDetails = mri_scan_report
    text_chunks = get_text_chunks(ideaDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Could you please help in summarizing the data input and help in generating ICD codes. Also, please share if the final Final ICD Codes generated in the data were matching. "})
    prompt_answer=result['answer']
    url=get_chatgpt_response(mri_scan_report)
    return {'answer':prompt_answer,'url':str(url).split(": ")[1]}



def get_chatgpt_response(prompt):
    try:
        model_engine = "text-davinci-003"
    # Generate a response
        completion = openai.Completion.create(
            engine=model_engine,
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0,
        )
        response = completion.choices[0].text
        return response
    except Exception as e:
        print(e)
        print("Inside Exception")
        return str(e)

table_data = [
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '15 years ago', 'Pediatric Checkup', 'Stethoscope (physical object)', 'None', 'None', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '14 years ago', 'Common Cold', 'Thermometer (physical object)', 'Pollen (substance) allergy by environment', 'Acetaminophen 500 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '13 years ago', 'Toothache', 'Dental mirror (physical object)', 'None', 'Ibuprofen 200 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '12 years ago', 'Ankle Twist', 'Crutches (physical object)', 'None', 'Naproxen 220 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '11 years ago', 'Headache', 'None', 'Dust mite (substance) allergy by environment', 'Aspirin 81 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '10 years ago', 'Stomachache', 'None', 'Lactose (substance) allergy by food', 'Antacid Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '9 years ago', 'Infection', 'None', 'Penicillin (medication) allergy by medication', 'Amoxicillin 500 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '8 years ago', 'Allergic Rhinitis', 'Nebulizer (physical object)', 'Pollen (substance) allergy by environment', 'Fluticasone Propionate 50 MCG/ACTUAT Nasal Spray', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '7 years ago', 'Sprained Knee', 'Knee brace (physical object)', 'None', 'Ibuprofen 400 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '6 years ago', 'Migraine', 'None', 'Chocolate (substance) allergy by food', 'Sumatriptan 50 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '5 years ago', 'Ear Infection', 'Otoscope (physical object)', 'None', 'Amoxicillin 500 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '4 years ago', 'Dental Checkup', 'Dental chair (physical object)', 'None', 'None', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '3 years ago', 'Allergic Conjunctivitis', 'Eye drops (physical object)', 'Dust mite (substance) allergy by environment', 'Antihistamine Eye Drops', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '2 years ago', 'Stomach Flu', 'None', 'Shellfish (substance) allergy by food', 'Ondansetron 4 MG Oral Tablet', 'Influenza vaccine'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '1 year ago', 'Broken Tooth', 'Dental X-ray (physical object)', 'None', 'None', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '6 months ago', 'Concussion', 'CT Scan (physical object)', 'None', 'Acetaminophen 500 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '5 months ago', 'Gastroenteritis', 'IV Drip (physical object)', 'Lactose (substance) allergy by food', 'None', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '4 months ago', 'Pneumonia', 'Oxygen mask (physical object)', 'Penicillin (medication) allergy by medication', 'Amoxicillin 500 MG Oral Tablet', 'Influenza vaccine'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '3 months ago', 'Ligament Tear', 'Knee brace (physical object)', 'None', 'Ibuprofen 600 MG Oral Tablet', 'None'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '2 months ago', 'Ligament Tear', 'Crutches (physical object)', 'None', 'Naproxen 220 MG Oral Tablet', 'Influenza vaccine'),
    ('c3b2e799-5291-dc30-dbfc-679181de00aa', '1 month ago', 'Ligament Tear', 'MRI (physical object)', 'None', 'Oxycodone Hydrochloride 10 MG Oral Tablet', 'None')
]


mri_scan_report = """
MRI Scan Report
Patient Information:
- Patient ID: [Patient ID]
- Name: [Patient Name]
- Date of Birth: [Patient DOB]
- Gender: [Patient Gender]
- Referring Physician: Dr. Smith
- Ordering Facility: [Hospital/Clinic Name]
MRI Scan Report
**Clinical Information:**
Reason for MRI: Torn ACL in the left knee
Referring Physician: Dr. Smith
Clinical History: The patient experienced pain and instability in the left knee.
**MRI Scan Findings:** - Knee Joint:
- Anterior Cruciate Ligament (ACL): Complete tear observed. - Medial Collateral Ligament (MCL): Normal.
- Lateral Collateral Ligament (LCL): Normal.
- Menisci: No significant tears or abnormalities.
- Patellar Tendon: Intact.
**Impressions:**
The MRI findings reveal a complete tear of the Anterior Cruciate Ligament (ACL) in the left knee. Further consultation with an orthopedic specialist is recommended for appropriate management.
MRI Scan Report (Continued)
**Additional Information:**
- Image Quality: High
- Contrast: Gadolinium-based contrast agent was not used. - Sedation: Not applicable
- Allergies: None reported
- Previous Surgeries: None reported
**Technical Details:**
- Imaging Protocol: Standard knee MRI protocol - MRI Machine: [MRI Machine Name and Model] - Date and Time of MRI: [Date and Time]
- Radiologist: [Name of Radiologist]
- Technician: [Name of MRI Technician]
**Conclusion:**
The MRI scan reveals a complete tear of the Anterior Cruciate Ligament (ACL) in the left knee. The findings should be correlated with the clinical symptoms for appropriate management. A detailed discussion with an orthopedic specialist is recommended.
**Follow-up Recommendations:**
The patient is advised to schedule a follow-up appointment with Dr. Smith or an orthopedic specialist to discuss further treatment options and rehabilitation.

Ligament Tear Summary
Date: 2023-10-01, Test ID: Test001, Test Name: MRI Scan, Doctor: Dr. Smith, Device Used: MRI Machine, Results: Torn ACL in the left knee, Doctor's Note: MRI scan revealed a torn ACL in the patient's left knee. Further consultation with an orthopedic specialist recommended.
Date: 2023-10-05, Test ID: Test002, Test Name: X-ray, Doctor: Dr. Johnson, Device Used: X-ray Machine, Results: Fracture in the tibia, Doctor's Note: X-ray examination identified a fracture in the patient's tibia. Casting and immobilization advised for recovery.
Date: 2023-10-10, Test ID: Test003, Test Name: Ultrasound, Doctor: Dr. Davis, Device Used: Ultrasound Machine, Results: Soft tissue damage in the ligament, Doctor's Note: Ultrasound examination showed soft tissue damage in the ligament. Physical therapy recommended for rehabilitation.
Date: 2023-10-15, Test ID: Test004, Test Name: CT Scan, Doctor: Dr. Anderson, Device Used: CT Scan Machine, Results: Confirmation of ligament tear and assessment of surrounding structures, Doctor's Note: CT scan confirmed the ligament tear and provided detailed assessment of surrounding structures. Surgical intervention discussed with the patient.
Date: 2023-10-20, Test ID: Test005, Test Name: Physical Examination, Doctor: Dr. Miller, Device Used: None, Results: Evaluation of range of motion and joint stability, Doctor's Note: Physical examination conducted to assess the patient's range of motion and joint stability. Exercise regimen prescribed for strengthening.
Date: 2023-10-25, Test ID: Test006, Test Name: Blood Test, Doctor: Dr. Wilson, Device Used: Blood Testing Equipment, Results: Rule out infection and assess overall health, Doctor's Note: Blood test performed to rule out infection and assess overall health. No abnormalities detected; patient advised to continue with prescribed medications.
Date: 2023-10-30, Test ID: Test007, Test Name: Arthroscopy, Doctor: Dr. White, Device Used: Arthroscopy Equipment, Results: Direct visualization of the ligament and joint structures, Doctor's Note: Arthroscopy procedure conducted for direct visualization of the ligament and joint structures. Surgical options discussed for ligament repair.
Date: 2023-11-05, Test ID: Test008, Test Name: Electromyography (EMG), Doctor: Dr. Brown, Device Used: EMG Machine, Results: Assessment of nerve function in the affected area, Doctor's Note: EMG performed to assess nerve function in the affected area. Results indicate nerve integrity, and physical therapy recommended for nerve recovery.
Date: 2023-11-10, Test ID: Test009, Test Name: Bone Density Test, Doctor: Dr. Taylor, Device Used: Bone Densitometer, Results: Evaluation of bone health and density, Doctor's Note: Bone density test conducted to evaluate bone health and density. No signs of osteoporosis detected; patient advised on maintaining bone health.
Date: 2023-11-15, Test ID: Test010, Test Name: Functional Movement Assessment, Doctor: Dr. Harris, Device Used: Motion Capture System, Results: Analysis of movement patterns and biomechanics, Doctor's Note: Functional movement assessment performed to analyze movement patterns and biomechanics. Personalized exercise plan provided for improved functional mobility.

Final ICD Codes generated:
ICD-10-CM Code: S83.511A - Complete tear of anterior cruciate ligament of left knee, initial encounter
ICD-10-PCS Code: 0SRD0JZ - Repair of anterior cruciate ligament, left knee, open approach
"""


if __name__ == '__main__':
    app.run(debug=True, port=5000)
