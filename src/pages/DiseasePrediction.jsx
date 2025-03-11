import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';

function DiseasePrediction() {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [suggestedSymptoms, setSuggestedSymptoms] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState('');
  const [doctorSpecialization, setDoctorSpecialization] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    date: '',
    time: '',
    phone: ''
  });

  const allSymptoms = [
    // Respiratory Symptoms
    'Cough', 'Shortness of breath', 'Wheezing', 'Chest tightness', 'Rapid breathing',
    'Difficulty breathing', 'Chest congestion', 'Sputum production', 'Nasal congestion',
    'Runny nose', 'Sore throat', 'Hoarseness', 'Sneezing',

    // Cardiovascular Symptoms
    'Chest pain', 'Heart palpitations', 'Irregular heartbeat', 'Rapid heart rate',
    'Slow heart rate', 'High blood pressure', 'Low blood pressure', 'Dizziness',
    'Fainting', 'Swelling in legs', 'Cold extremities',

    // Gastrointestinal Symptoms
    'Abdominal pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Constipation',
    'Bloating', 'Gas', 'Indigestion', 'Heartburn', 'Loss of appetite',
    'Increased appetite', 'Difficulty swallowing', 'Blood in stool',

    // Neurological Symptoms
    'Headache', 'Migraine', 'Dizziness', 'Vertigo', 'Confusion',
    'Memory loss', 'Difficulty concentrating', 'Seizures', 'Tremors',
    'Weakness', 'Numbness', 'Tingling', 'Loss of balance',

    // Musculoskeletal Symptoms
    'Joint pain', 'Muscle pain', 'Back pain', 'Neck pain', 'Stiffness',
    'Swelling in joints', 'Reduced mobility', 'Muscle weakness', 'Muscle cramps',
    'Bone pain', 'Arthritis', 'Gout',

    // Skin Symptoms
    'Rash', 'Itching', 'Hives', 'Dry skin', 'Excessive sweating',
    'Skin discoloration', 'Bruising', 'Acne', 'Eczema', 'Psoriasis',
    'Skin lesions', 'Hair loss', 'Nail changes',

    // Mental Health Symptoms
    'Anxiety', 'Depression', 'Mood swings', 'Irritability', 'Insomnia',
    'Excessive sleeping', 'Fatigue', 'Stress', 'Panic attacks', 'Phobias',
    'Social withdrawal', 'Loss of interest',

    // Eye Symptoms
    'Blurred vision', 'Double vision', 'Eye pain', 'Red eyes', 'Dry eyes',
    'Watery eyes', 'Light sensitivity', 'Night blindness', 'Vision loss',
    'Eye discharge', 'Eye strain',

    // Ear Symptoms
    'Ear pain', 'Hearing loss', 'Ringing in ears', 'Ear discharge',
    'Ear fullness', 'Vertigo', 'Ear infection', 'Ear wax buildup',

    // Urinary Symptoms
    'Frequent urination', 'Painful urination', 'Blood in urine', 'Urinary urgency',
    'Incontinence', 'Difficulty urinating', 'Cloudy urine', 'Dark urine',

    // Reproductive Symptoms
    'Menstrual pain', 'Irregular periods', 'Heavy periods', 'Vaginal discharge',
    'Erectile dysfunction', 'Low libido', 'Infertility', 'Breast pain',

    // General Symptoms
    'Fever', 'Chills', 'Night sweats', 'Weight loss', 'Weight gain',
    'Fatigue', 'Weakness', 'Loss of appetite', 'Dehydration', 'Malaise',
    'Body aches', 'Dizziness', 'Fainting', 'Sleep problems'
  ];

  const diseasePatterns = {
    'fever, cough, sore throat': {
      disease: 'Common Cold',
      specialist: 'General Physician',
      precautions: [
        'Rest adequately',
        'Stay hydrated',
        'Take over-the-counter medications',
        'Use a humidifier',
        'Avoid close contact with others',
        'Practice good hand hygiene'
      ]
    },
    'chest pain, shortness of breath, rapid heart rate': {
      disease: 'Possible Cardiac Issue',
      specialist: 'Cardiologist',
      precautions: [
        'Seek immediate medical attention',
        'Rest and avoid physical exertion',
        'Take prescribed medications',
        'Monitor blood pressure',
        'Call emergency services if severe'
      ]
    },
    'headache, nausea, light sensitivity': {
      disease: 'Migraine',
      specialist: 'Neurologist',
      precautions: [
        'Rest in a quiet, dark room',
        'Apply cold/hot compress',
        'Stay hydrated',
        'Avoid triggers',
        'Take prescribed medications'
      ]
    },
    'abdominal pain, diarrhea, vomiting': {
      disease: 'Gastroenteritis',
      specialist: 'Gastroenterologist',
      precautions: [
        'Stay hydrated',
        'Follow BRAT diet',
        'Rest adequately',
        'Avoid dairy products',
        'Take probiotics'
      ]
    },
    'joint pain, stiffness, swelling': {
      disease: 'Arthritis',
      specialist: 'Rheumatologist',
      precautions: [
        'Exercise regularly',
        'Maintain a healthy weight',
        'Use assistive devices',
        'Apply hot/cold therapy',
        'Take prescribed medications'
      ]
    },
    'rash, itching, hives': {
      disease: 'Allergic Reaction',
      specialist: 'Allergist',
      precautions: [
        'Identify and avoid triggers',
        'Take antihistamines',
        'Apply calming lotions',
        'Keep skin cool',
        'Seek emergency care if severe'
      ]
    },
    'anxiety, insomnia, panic attacks': {
      disease: 'Anxiety Disorder',
      specialist: 'Psychiatrist',
      precautions: [
        'Practice relaxation techniques',
        'Maintain regular sleep schedule',
        'Exercise regularly',
        'Seek counseling',
        'Avoid caffeine and alcohol'
      ]
    }
  };

  const doctors = [
    { name: 'Dr. Sarah Johnson', specialization: 'General Physician', experience: '15 years', availability: 'Mon-Fri' },
    { name: 'Dr. Michael Chen', specialization: 'Cardiologist', experience: '12 years', availability: 'Tue-Sat' },
    { name: 'Dr. Emily Brown', specialization: 'Neurologist', experience: '10 years', availability: 'Mon-Thu' },
    { name: 'Dr. David Wilson', specialization: 'Rheumatologist', experience: '8 years', availability: 'Wed-Sun' },
    { name: 'Dr. Lisa Anderson', specialization: 'Gastroenterologist', experience: '14 years', availability: 'Mon-Fri' },
    { name: 'Dr. James Taylor', specialization: 'Allergist', experience: '11 years', availability: 'Mon-Wed' },
    { name: 'Dr. Maria Rodriguez', specialization: 'General Physician', experience: '9 years', availability: 'Thu-Sun' },
    { name: 'Dr. Robert Kim', specialization: 'Cardiologist', experience: '16 years', availability: 'Mon-Fri' }
  ];

  useEffect(() => {
    if (symptoms.length > 0) {
      const suggestions = allSymptoms.filter(symptom => 
        symptom.toLowerCase().includes(symptoms.toLowerCase()) &&
        !selectedSymptoms.includes(symptom)
      );
      setSuggestedSymptoms(suggestions);
    } else {
      setSuggestedSymptoms([]);
    }
  }, [symptoms, selectedSymptoms]);

  const handleSymptomClick = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      const newSymptoms = [...selectedSymptoms, symptom];
      setSelectedSymptoms(newSymptoms);
      setSymptoms('');
      setSuggestedSymptoms([]);
    }
  };

  const handleRemoveSymptom = (symptomToRemove) => {
    const newSymptoms = selectedSymptoms.filter(s => s !== symptomToRemove);
    setSelectedSymptoms(newSymptoms);
  };

  const findBestMatchingDisease = (selectedSymptoms) => {
    let bestMatch = null;
    let maxMatchingSymptoms = 0;

    for (const [pattern, disease] of Object.entries(diseasePatterns)) {
      const patternSymptoms = pattern.toLowerCase().split(', ');
      const matchingSymptoms = selectedSymptoms.filter(symptom =>
        patternSymptoms.some(p => symptom.toLowerCase().includes(p))
      ).length;

      if (matchingSymptoms > maxMatchingSymptoms) {
        maxMatchingSymptoms = matchingSymptoms;
        bestMatch = disease;
      }
    }

    return bestMatch || {
      disease: 'General Check Required',
      specialist: 'General Physician',
      precautions: [
        'Schedule a general check-up',
        'Monitor symptoms',
        'Maintain good hygiene',
        'Stay hydrated',
        'Get adequate rest',
        'Keep a symptom diary'
      ]
    };
  };

  const handlePrediction = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const prediction = findBestMatchingDisease(selectedSymptoms);
    setPredictedDisease(prediction.disease);
    setDoctorSpecialization(prediction.specialist);
    setIsLoading(false);
  };

  const handleAppointment = () => {
    const mailtoLink = `mailto:doctor@healthsync.com?subject=Appointment Request&body=Patient Name: ${formData.name}%0D%0AAge: ${formData.age}%0D%0ADate of Appointment: ${formData.date}%0D%0ATime of Appointment: ${formData.time}%0D%0AContact Number: ${formData.phone}%0D%0ADisease Predicted: ${predictedDisease}`;
    window.location.href = mailtoLink;
    setShowForm(false);
    setFormData({ name: '', age: '', date: '', time: '', phone: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Disease Prediction</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter or select symptoms:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Type to search symptoms..."
                  className="w-full p-3 border rounded-md mb-2"
                />
                {suggestedSymptoms.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {suggestedSymptoms.map((symptom, index) => (
                      <button
                        key={index}
                        onClick={() => handleSymptomClick(symptom)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSymptoms.map((symptom, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {symptom}
                    <button
                      onClick={() => handleRemoveSymptom(symptom)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {allSymptoms.slice(0, 12).map((symptom, index) => (
                  <button
                    key={index}
                    onClick={() => handleSymptomClick(symptom)}
                    className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePrediction}
              disabled={isLoading || selectedSymptoms.length === 0}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:bg-gray-400"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Symptoms...
                </>
              ) : (
                'Predict Disease'
              )}
            </button>
          </div>

          {predictedDisease && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-md mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prediction Results</h2>
              <div className="mb-6">
                <p className="text-lg font-semibold">Predicted Disease: <span className="text-indigo-600">{predictedDisease}</span></p>
                <p className="text-md">Recommended Specialist: <span className="text-indigo-600">{doctorSpecialization}</span></p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Recommended Precautions:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {findBestMatchingDisease(selectedSymptoms).precautions.map((precaution, index) => (
                    <li key={index} className="text-gray-700">{precaution}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-gray-600 mb-1">{doctor.specialization}</p>
                <p className="text-gray-600 mb-1">Experience: {doctor.experience}</p>
                <p className="text-gray-600 mb-4">Available: {doctor.availability}</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Book Appointment
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Book Appointment
            </Dialog.Title>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="tel"
                placeholder="Contact Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAppointment}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DiseasePrediction;