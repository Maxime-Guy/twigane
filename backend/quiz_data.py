"""
Kinyarwanda Quiz Question Database
Contains questions for different categories and difficulty levels
"""

import random
from typing import List, Dict, Any

# Quiz Questions Database - Expanded Version
QUIZ_QUESTIONS = {
    "vocabulary": {
        "beginner": [
            {
                "id": "vocab_001",
                "question": "What does 'Muraho' mean in English?",
                "options": ["Hello", "Goodbye", "Thank you", "Please"],
                "correct_answer": 0,
                "explanation": "'Muraho' is a common greeting meaning 'Hello' in Kinyarwanda."
            },
            {
                "id": "vocab_002", 
                "question": "How do you say 'Thank you' in Kinyarwanda?",
                "options": ["Murakoze", "Muraho", "Murakomeye", "Mwaramutse"],
                "correct_answer": 0,
                "explanation": "'Murakoze' is the standard way to say 'Thank you' in Kinyarwanda."
            },
            {
                "id": "vocab_003",
                "question": "What is the Kinyarwanda word for 'water'?",
                "options": ["Ubuki", "Amazi", "Amata", "Ikawa"],
                "correct_answer": 1,
                "explanation": "'Amazi' means water in Kinyarwanda."
            },
            {
                "id": "vocab_004",
                "question": "How do you say 'Good morning' in Kinyarwanda?",
                "options": ["Mwiriwe", "Mwaramutse", "Ijoro ryiza", "Umunsi mwiza"],
                "correct_answer": 1,
                "explanation": "'Mwaramutse' is used to greet someone in the morning."
            },
            {
                "id": "vocab_005",
                "question": "What does 'Amakuru' mean?",
                "options": ["Food", "News/How are things", "School", "Money"],
                "correct_answer": 1,
                "explanation": "'Amakuru' means 'news' or is used to ask 'how are things?'"
            },
            {
                "id": "vocab_006",
                "question": "What is the Kinyarwanda word for 'book'?",
                "options": ["Igitabo", "Ikaramu", "Ikawa", "Igikoni"],
                "correct_answer": 0,
                "explanation": "'Igitabo' means book in Kinyarwanda."
            },
            {
                "id": "vocab_007",
                "question": "How do you say 'house' in Kinyarwanda?",
                "options": ["Inzu", "Ishuri", "Isoko", "Ikigo"],
                "correct_answer": 0,
                "explanation": "'Inzu' means house or home in Kinyarwanda."
            },
            {
                "id": "vocab_008",
                "question": "What does 'Ijoro ryiza' mean?",
                "options": ["Good morning", "Good afternoon", "Good night", "Good day"],
                "correct_answer": 2,
                "explanation": "'Ijoro ryiza' means 'good night' in Kinyarwanda."
            },
            {
                "id": "vocab_009",
                "question": "What is 'Mama' in English?",
                "options": ["Father", "Mother", "Sister", "Brother"],
                "correct_answer": 1,
                "explanation": "'Mama' means mother in Kinyarwanda."
            },
            {
                "id": "vocab_010",
                "question": "How do you say 'Yes' in Kinyarwanda?",
                "options": ["Oya", "Yego", "Ariko", "Kandi"],
                "correct_answer": 1,
                "explanation": "'Yego' means 'yes' in Kinyarwanda."
            },
            {
                "id": "vocab_011",
                "question": "What does 'Oya' mean?",
                "options": ["Yes", "No", "Maybe", "Always"],
                "correct_answer": 1,
                "explanation": "'Oya' means 'no' in Kinyarwanda."
            },
            {
                "id": "vocab_012",
                "question": "What is the Kinyarwanda word for 'child'?",
                "options": ["Umugabo", "Umugore", "Umwana", "Umusaza"],
                "correct_answer": 2,
                "explanation": "'Umwana' means child in Kinyarwanda."
            },
            {
                "id": "vocab_013",
                "question": "How do you say 'food' in Kinyarwanda?",
                "options": ["Ibiryo", "Amazi", "Ikawa", "Ubuki"],
                "correct_answer": 0,
                "explanation": "'Ibiryo' means food in Kinyarwanda."
            },
            {
                "id": "vocab_014",
                "question": "What does 'Papa' mean?",
                "options": ["Mother", "Father", "Uncle", "Grandfather"],
                "correct_answer": 1,
                "explanation": "'Papa' means father in Kinyarwanda."
            },
            {
                "id": "vocab_015",
                "question": "What is 'Ishuri' in English?",
                "options": ["Hospital", "School", "Market", "Church"],
                "correct_answer": 1,
                "explanation": "'Ishuri' means school in Kinyarwanda."
            },
            {
                "id": "vocab_016",
                "question": "How do you say 'friend' in Kinyarwanda?",
                "options": ["Inshuti", "Munyangezi", "Umucuruzi", "Umunyeshuri"],
                "correct_answer": 0,
                "explanation": "'Inshuti' means friend in Kinyarwanda."
            },
            {
                "id": "vocab_017",
                "question": "What does 'Amata' mean?",
                "options": ["Water", "Milk", "Juice", "Tea"],
                "correct_answer": 1,
                "explanation": "'Amata' means milk in Kinyarwanda."
            },
            {
                "id": "vocab_018",
                "question": "What is the Kinyarwanda word for 'car'?",
                "options": ["Igare", "Imodoka", "Indege", "Ubwato"],
                "correct_answer": 1,
                "explanation": "'Imodoka' means car in Kinyarwanda."
            },
            {
                "id": "vocab_019",
                "question": "How do you say 'dog' in Kinyarwanda?",
                "options": ["Injangwe", "Imbwa", "Inka", "Intama"],
                "correct_answer": 1,
                "explanation": "'Imbwa' means dog in Kinyarwanda."
            },
            {
                "id": "vocab_020",
                "question": "What does 'Injangwe' mean?",
                "options": ["Dog", "Cat", "Bird", "Fish"],
                "correct_answer": 1,
                "explanation": "'Injangwe' means cat in Kinyarwanda."
            }
        ],
        "intermediate": [
            {
                "id": "vocab_101",
                "question": "What is the meaning of 'Ubwoba'?",
                "options": ["Love", "Fear", "Joy", "Anger"],
                "correct_answer": 1,
                "explanation": "'Ubwoba' means fear in Kinyarwanda."
            },
            {
                "id": "vocab_102",
                "question": "How do you say 'to study' in Kinyarwanda?",
                "options": ["Kwiga", "Gusoma", "Kwandika", "Gukora"],
                "correct_answer": 0,
                "explanation": "'Kwiga' means to study or to learn in Kinyarwanda."
            },
            {
                "id": "vocab_103",
                "question": "What does 'Ubwiyunge' mean?",
                "options": ["Happiness", "Sadness", "Patience", "Wisdom"],
                "correct_answer": 2,
                "explanation": "'Ubwiyunge' means patience in Kinyarwanda."
            },
            {
                "id": "vocab_104",
                "question": "What is 'Inyama' in English?",
                "options": ["Vegetables", "Meat", "Rice", "Bread"],
                "correct_answer": 1,
                "explanation": "'Inyama' means meat in Kinyarwanda."
            },
            {
                "id": "vocab_105",
                "question": "What does 'Umurimo' mean?",
                "options": ["Work/Job", "Holiday", "Rest", "Play"],
                "correct_answer": 0,
                "explanation": "'Umurimo' means work or job in Kinyarwanda."
            },
            {
                "id": "vocab_106",
                "question": "How do you say 'to write' in Kinyarwanda?",
                "options": ["Gusoma", "Kwandika", "Gukora", "Kwiga"],
                "correct_answer": 1,
                "explanation": "'Kwandika' means to write in Kinyarwanda."
            },
            {
                "id": "vocab_107",
                "question": "What is 'Ubushake' in English?",
                "options": ["Anger", "Will/Desire", "Confusion", "Surprise"],
                "correct_answer": 1,
                "explanation": "'Ubushake' means will or desire in Kinyarwanda."
            },
            {
                "id": "vocab_108",
                "question": "What does 'Ukwezi' mean?",
                "options": ["Week", "Month", "Year", "Day"],
                "correct_answer": 1,
                "explanation": "'Ukwezi' means month in Kinyarwanda."
            },
            {
                "id": "vocab_109",
                "question": "How do you say 'teacher' in Kinyarwanda?",
                "options": ["Umwarimu", "Umuganga", "Umucuruzi", "Umunyeshuri"],
                "correct_answer": 0,
                "explanation": "'Umwarimu' means teacher in Kinyarwanda."
            },
            {
                "id": "vocab_110",
                "question": "What is 'Ubuzima' in English?",
                "options": ["Death", "Life", "Health", "Sickness"],
                "correct_answer": 1,
                "explanation": "'Ubuzima' means life in Kinyarwanda."
            },
            {
                "id": "vocab_111",
                "question": "What does 'Gusangira' mean?",
                "options": ["To hide", "To share", "To steal", "To keep"],
                "correct_answer": 1,
                "explanation": "'Gusangira' means to share in Kinyarwanda."
            },
            {
                "id": "vocab_112",
                "question": "How do you say 'kitchen' in Kinyarwanda?",
                "options": ["Igikoni", "Urubuga", "Ubwato", "Ikigo"],
                "correct_answer": 0,
                "explanation": "'Igikoni' means kitchen in Kinyarwanda."
            },
            {
                "id": "vocab_113",
                "question": "What is 'Ubwenge' in English?",
                "options": ["Stupidity", "Intelligence", "Luck", "Beauty"],
                "correct_answer": 1,
                "explanation": "'Ubwenge' means intelligence or wisdom in Kinyarwanda."
            },
            {
                "id": "vocab_114",
                "question": "What does 'Guhangana' mean?",
                "options": ["To give up", "To persevere", "To run away", "To complain"],
                "correct_answer": 1,
                "explanation": "'Guhangana' means to persevere or endure in Kinyarwanda."
            },
            {
                "id": "vocab_115",
                "question": "How do you say 'market' in Kinyarwanda?",
                "options": ["Ishuri", "Isoko", "Ikigo", "Inzu"],
                "correct_answer": 1,
                "explanation": "'Isoko' means market in Kinyarwanda."
            }
        ],
        "advanced": [
            {
                "id": "vocab_201",
                "question": "What does 'Ubwiyangane' mean?",
                "options": ["Cooperation", "Competition", "Confusion", "Celebration"],
                "correct_answer": 0,
                "explanation": "'Ubwiyangane' means cooperation or working together."
            },
            {
                "id": "vocab_202",
                "question": "What is the meaning of 'Ubwoba-bwoba'?",
                "options": ["Very afraid", "Respectful fear", "Excitement", "Anticipation"],
                "correct_answer": 1,
                "explanation": "'Ubwoba-bwoba' refers to respectful fear or reverence."
            },
            {
                "id": "vocab_203",
                "question": "What does 'Ubusabane' mean?",
                "options": ["Selfishness", "Generosity/Sharing", "Greed", "Indifference"],
                "correct_answer": 1,
                "explanation": "'Ubusabane' refers to the spirit of sharing and hospitality."
            },
            {
                "id": "vocab_204",
                "question": "What is 'Ubwiyunge' in its deeper cultural meaning?",
                "options": ["Simple patience", "Enduring wisdom", "Quick action", "Immediate response"],
                "correct_answer": 1,
                "explanation": "'Ubwiyunge' represents deep, enduring patience with wisdom."
            },
            {
                "id": "vocab_205",
                "question": "What does 'Ubwiyerekane' mean?",
                "options": ["Self-reliance", "Showing each other/mutual aid", "Independence", "Isolation"],
                "correct_answer": 1,
                "explanation": "'Ubwiyerekane' means showing each other or mutual aid."
            },
            {
                "id": "vocab_206",
                "question": "What is 'Ubwubake' in English?",
                "options": ["Building", "Reconstruction", "Destruction", "Abandonment"],
                "correct_answer": 1,
                "explanation": "'Ubwubake' refers to reconstruction or rebuilding."
            },
            {
                "id": "vocab_207",
                "question": "What does 'Ubushingantahe' mean?",
                "options": ["Leadership", "Mediation/arbitration", "Dictatorship", "Anarchy"],
                "correct_answer": 1,
                "explanation": "'Ubushingantahe' refers to traditional mediation or arbitration."
            },
            {
                "id": "vocab_208",
                "question": "What is 'Ubwarimu' in its full meaning?",
                "options": ["Simple teaching", "Wise guidance and mentorship", "Commanding", "Criticizing"],
                "correct_answer": 1,
                "explanation": "'Ubwarimu' encompasses wise guidance and mentorship beyond simple teaching."
            },
            {
                "id": "vocab_209",
                "question": "What does 'Ubwiyumvire' mean?",
                "options": ["Deafness", "Deep understanding/empathy", "Confusion", "Ignorance"],
                "correct_answer": 1,
                "explanation": "'Ubwiyumvire' means deep understanding or empathy."
            },
            {
                "id": "vocab_210",
                "question": "What is 'Ubuhangane' in English?",
                "options": ["Giving up", "Perseverance through hardship", "Complaining", "Avoiding problems"],
                "correct_answer": 1,
                "explanation": "'Ubuhangane' means perseverance through difficult times."
            }
        ]
    },
    "grammar": {
        "beginner": [
            {
                "id": "gram_001",
                "question": "In Kinyarwanda, what is the correct way to ask 'What is your name?'",
                "options": ["Witwa nde?", "Wita rite?", "Uziko wita rite?", "Witwa gute?"],
                "correct_answer": 0,
                "explanation": "'Witwa nde?' is the standard way to ask someone's name."
            },
            {
                "id": "gram_002",
                "question": "How do you say 'I am called...' in Kinyarwanda?",
                "options": ["Nitwa...", "Nkunda...", "Ndi...", "Nzi..."],
                "correct_answer": 0,
                "explanation": "'Nitwa...' followed by your name is how you introduce yourself."
            },
            {
                "id": "gram_003",
                "question": "What is the correct plural form of 'umuntu' (person)?",
                "options": ["umuntu", "abantu", "umuntu-ntu", "bantu"],
                "correct_answer": 1,
                "explanation": "The plural of 'umuntu' is 'abantu' (people)."
            },
            {
                "id": "gram_004",
                "question": "How do you say 'I am' in Kinyarwanda?",
                "options": ["Ndi", "Uri", "Ari", "Turi"],
                "correct_answer": 0,
                "explanation": "'Ndi' means 'I am' in Kinyarwanda."
            },
            {
                "id": "gram_005",
                "question": "What is the plural of 'igitabo' (book)?",
                "options": ["igitabo", "ibitabo", "amatabo", "ubutabo"],
                "correct_answer": 1,
                "explanation": "The plural of 'igitabo' is 'ibitabo'."
            },
            {
                "id": "gram_006",
                "question": "How do you say 'You are' (singular) in Kinyarwanda?",
                "options": ["Ndi", "Uri", "Ari", "Muri"],
                "correct_answer": 1,
                "explanation": "'Uri' means 'you are' (singular) in Kinyarwanda."
            },
            {
                "id": "gram_007",
                "question": "What is the correct form: 'He/She is a teacher'?",
                "options": ["Ni umwarimu", "Ari umwarimu", "Uri umwarimu", "Ndi umwarimu"],
                "correct_answer": 1,
                "explanation": "'Ari umwarimu' means 'He/She is a teacher'."
            },
            {
                "id": "gram_008",
                "question": "How do you say 'We are' in Kinyarwanda?",
                "options": ["Ndi", "Uri", "Turi", "Bari"],
                "correct_answer": 2,
                "explanation": "'Turi' means 'we are' in Kinyarwanda."
            },
            {
                "id": "gram_009",
                "question": "What is the plural of 'umwana' (child)?",
                "options": ["abana", "imwana", "amana", "ubwana"],
                "correct_answer": 0,
                "explanation": "The plural of 'umwana' is 'abana' (children)."
            },
            {
                "id": "gram_010",
                "question": "How do you say 'They are' in Kinyarwanda?",
                "options": ["Turi", "Muri", "Bari", "Ari"],
                "correct_answer": 2,
                "explanation": "'Bari' means 'they are' in Kinyarwanda."
            },
            {
                "id": "gram_011",
                "question": "What is the subject prefix for 'I' in Kinyarwanda verbs?",
                "options": ["n-", "u-", "a-", "tu-"],
                "correct_answer": 0,
                "explanation": "'n-' is the subject prefix for 'I' in Kinyarwanda verbs."
            },
            {
                "id": "gram_012",
                "question": "How do you say 'You are' (plural) in Kinyarwanda?",
                "options": ["Uri", "Turi", "Muri", "Bari"],
                "correct_answer": 2,
                "explanation": "'Muri' means 'you are' (plural) in Kinyarwanda."
            },
            {
                "id": "gram_013",
                "question": "What class does 'inzu' (house) belong to?",
                "options": ["Class 1/2", "Class 9/10", "Class 7/8", "Class 5/6"],
                "correct_answer": 1,
                "explanation": "'Inzu' belongs to class 9/10 (in-/in-)."
            },
            {
                "id": "gram_014",
                "question": "How do you form the negative of 'Ndi umwarimu' (I am a teacher)?",
                "options": ["Sindi umwarimu", "Ntabwo ndi umwarimu", "Oya ndi umwarimu", "Nta umwarimu"],
                "correct_answer": 0,
                "explanation": "'Sindi umwarimu' means 'I am not a teacher'."
            },
            {
                "id": "gram_015",
                "question": "What is the plural of 'inyama' (meat)?",
                "options": ["inyama", "amanyama", "ubwanyama", "inyama nyinshi"],
                "correct_answer": 1,
                "explanation": "The plural of 'inyama' is 'amanyama'."
            }
        ],
        "intermediate": [
            {
                "id": "gram_101",
                "question": "What is the past tense marker in Kinyarwanda?",
                "options": ["ra-", "za-", "a-", "ri-"],
                "correct_answer": 0,
                "explanation": "'ra-' is commonly used to indicate past tense in Kinyarwanda."
            },
            {
                "id": "gram_102",
                "question": "How do you form the future tense in Kinyarwanda?",
                "options": ["Using 'nza-'", "Using 'ra-'", "Using 'ri-'", "Using 'a-'"],
                "correct_answer": 0,
                "explanation": "'nza-' is used to form future tense in Kinyarwanda."
            },
            {
                "id": "gram_103",
                "question": "What is the present tense marker in Kinyarwanda?",
                "options": ["ra-", "a-", "za-", "ri-"],
                "correct_answer": 1,
                "explanation": "'a-' is the present tense marker in Kinyarwanda."
            },
            {
                "id": "gram_104",
                "question": "How do you say 'I read' (past tense) in Kinyarwanda?",
                "options": ["Nsoma", "Nasome", "Nasomye", "Nzasoma"],
                "correct_answer": 2,
                "explanation": "'Nasomye' means 'I read' (past tense) in Kinyarwanda."
            },
            {
                "id": "gram_105",
                "question": "What is the continuous/progressive marker in Kinyarwanda?",
                "options": ["ra-...a", "a-...a", "ri-...a", "za-...a"],
                "correct_answer": 1,
                "explanation": "'a-...a' structure indicates continuous action in Kinyarwanda."
            },
            {
                "id": "gram_106",
                "question": "How do you form the subjunctive mood in Kinyarwanda?",
                "options": ["Remove final vowel, add -e", "Add -aga", "Add -ye", "Add -a"],
                "correct_answer": 0,
                "explanation": "Subjunctive is formed by removing the final vowel and adding -e."
            },
            {
                "id": "gram_107",
                "question": "What does the prefix 'ku-' indicate in verbs?",
                "options": ["Past tense", "Infinitive", "Future tense", "Negative"],
                "correct_answer": 1,
                "explanation": "'Ku-' prefix indicates the infinitive form of verbs."
            },
            {
                "id": "gram_108",
                "question": "How do you say 'I will read' in Kinyarwanda?",
                "options": ["Nsoma", "Nasomye", "Nzasoma", "Nasoma"],
                "correct_answer": 2,
                "explanation": "'Nzasoma' means 'I will read' in Kinyarwanda."
            },
            {
                "id": "gram_109",
                "question": "What is the negative marker for past tense?",
                "options": ["nti-", "si-", "nta-", "nte-"],
                "correct_answer": 0,
                "explanation": "'Nti-' is used for negative past tense in Kinyarwanda."
            },
            {
                "id": "gram_110",
                "question": "How do you form the habitual past in Kinyarwanda?",
                "options": ["na-...-aga", "ra-...-aga", "a-...-aga", "za-...-aga"],
                "correct_answer": 0,
                "explanation": "'na-...-aga' indicates habitual past actions."
            },
            {
                "id": "gram_111",
                "question": "What does the suffix '-ire' indicate?",
                "options": ["Future action", "Perfect aspect", "Continuous action", "Negative action"],
                "correct_answer": 1,
                "explanation": "'-ire' indicates perfect aspect (completed action)."
            },
            {
                "id": "gram_112",
                "question": "How do you form the conditional mood?",
                "options": ["na-...-a", "nta-...-a", "nja-...-a", "nda-...-a"],
                "correct_answer": 0,
                "explanation": "'na-...-a' structure forms conditional mood."
            },
            {
                "id": "gram_113",
                "question": "What class do most animals belong to?",
                "options": ["Class 1/2", "Class 9/10", "Class 7/8", "Class 3/4"],
                "correct_answer": 1,
                "explanation": "Most animals belong to class 9/10 in Kinyarwanda."
            },
            {
                "id": "gram_114",
                "question": "How do you express 'not yet' in Kinyarwanda?",
                "options": ["Ntibyarigeze", "Ntabwo", "Ntibyigera", "Ntihageze"],
                "correct_answer": 2,
                "explanation": "'Ntibyigera' means 'not yet' in Kinyarwanda."
            },
            {
                "id": "gram_115",
                "question": "What is the passive marker in Kinyarwanda verbs?",
                "options": ["-wa", "-ka", "-na", "-ra"],
                "correct_answer": 0,
                "explanation": "'-wa' is the passive marker in Kinyarwanda verbs."
            }
        ],
        "advanced": [
            {
                "id": "gram_201",
                "question": "In Kinyarwanda, what is the subjunctive mood used for?",
                "options": ["Commands only", "Wishes and possibilities", "Past events", "Questions"],
                "correct_answer": 1,
                "explanation": "The subjunctive mood expresses wishes, possibilities, and hypothetical situations."
            },
            {
                "id": "gram_202",
                "question": "What is the function of the 'guca' construction?",
                "options": ["Simple future", "Emphatic future", "Immediate future", "Conditional future"],
                "correct_answer": 2,
                "explanation": "'Guca' construction indicates immediate or near future."
            },
            {
                "id": "gram_203",
                "question": "How do you express cause and effect with 'kubera ko'?",
                "options": ["Kubera ko + indicative", "Kubera ko + subjunctive", "Kubera ko + infinitive", "Kubera ko + imperative"],
                "correct_answer": 0,
                "explanation": "'Kubera ko' (because) is followed by indicative mood."
            },
            {
                "id": "gram_204",
                "question": "What does the aspectual marker '-racyaha' indicate?",
                "options": ["Completed action", "Still ongoing action", "Future action", "Habitual action"],
                "correct_answer": 1,
                "explanation": "'-racyaha' indicates an action that is still ongoing."
            },
            {
                "id": "gram_205",
                "question": "In relative clauses, what changes in the verb structure?",
                "options": ["Tense markers", "Aspect markers", "Both tense and aspect", "Only subject prefixes"],
                "correct_answer": 2,
                "explanation": "Relative clauses affect both tense and aspect markers in Kinyarwanda."
            },
            {
                "id": "gram_206",
                "question": "What is the difference between 'kugira ngo' and 'kubana'?",
                "options": ["No difference", "Purpose vs. accompaniment", "Time vs. space", "Active vs. passive"],
                "correct_answer": 1,
                "explanation": "'Kugira ngo' expresses purpose while 'kubana' expresses accompaniment."
            },
            {
                "id": "gram_207",
                "question": "How do you form the reciprocal in Kinyarwanda?",
                "options": ["Using -an-", "Using -ir-", "Using -w-", "Using -kan-"],
                "correct_answer": 0,
                "explanation": "Reciprocal is formed using the '-an-' infix."
            },
            {
                "id": "gram_208",
                "question": "What does the suffix '-ura' typically indicate?",
                "options": ["Reversal of action", "Completion", "Beginning", "Repetition"],
                "correct_answer": 0,
                "explanation": "'-ura' typically indicates reversal or undoing of an action."
            },
            {
                "id": "gram_209",
                "question": "In complex sentences, how is temporal sequence expressed?",
                "options": ["Only word order", "Specific conjunctions", "Tense harmony", "All of the above"],
                "correct_answer": 3,
                "explanation": "Temporal sequence uses word order, conjunctions, and tense harmony."
            },
            {
                "id": "gram_210",
                "question": "What is the function of the infix '-gu-' in some verbs?",
                "options": ["Past tense", "Object marker", "Reflexive", "Causative"],
                "correct_answer": 1,
                "explanation": "'-gu-' serves as an object marker in some verbal forms."
            }
        ]
    },
    "culture": {
        "beginner": [
            {
                "id": "cult_001",
                "question": "What is the traditional greeting gesture in Rwandan culture?",
                "options": ["Bowing", "Handshake", "Hug", "Wave"],
                "correct_answer": 1,
                "explanation": "A handshake is the common traditional greeting in Rwandan culture."
            },
            {
                "id": "cult_002",
                "question": "What is 'Ubusabane'?",
                "options": ["A dance", "Traditional sharing/hospitality", "A food", "A ceremony"],
                "correct_answer": 1,
                "explanation": "'Ubusabane' refers to the Rwandan tradition of sharing and hospitality."
            },
            {
                "id": "cult_003",
                "question": "What is 'Umuganura'?",
                "options": ["New Year", "Harvest festival", "Wedding ceremony", "Birth ritual"],
                "correct_answer": 1,
                "explanation": "'Umuganura' is the traditional harvest festival in Rwanda."
            },
            {
                "id": "cult_004",
                "question": "What is the traditional Rwandan basket called?",
                "options": ["Agaseke", "Igikoni", "Urukundo", "Umudende"],
                "correct_answer": 0,
                "explanation": "'Agaseke' is the traditional Rwandan peace basket."
            },
            {
                "id": "cult_005",
                "question": "What does 'Mwaramutse' literally mean?",
                "options": ["Good morning", "May you have a good day", "Rise well", "Sleep well"],
                "correct_answer": 2,
                "explanation": "'Mwaramutse' literally means 'rise well' or 'wake up well'."
            },
            {
                "id": "cult_006",
                "question": "In Rwandan culture, what is the significance of sharing a meal?",
                "options": ["Just eating", "Building relationships", "Saving money", "Following rules"],
                "correct_answer": 1,
                "explanation": "Sharing meals builds relationships and community bonds in Rwandan culture."
            },
            {
                "id": "cult_007",
                "question": "What is the traditional Rwandan dance called?",
                "options": ["Intore", "Ubwiyunge", "Ubunyangamugayo", "Ubwoba"],
                "correct_answer": 0,
                "explanation": "'Intore' is the traditional Rwandan warrior dance."
            },
            {
                "id": "cult_008",
                "question": "What does showing respect to elders demonstrate in Rwandan culture?",
                "options": ["Fear", "Good upbringing", "Weakness", "Formality"],
                "correct_answer": 1,
                "explanation": "Respecting elders shows good upbringing and cultural values."
            },
            {
                "id": "cult_009",
                "question": "What is 'Ubwoba-bwoba' in cultural context?",
                "options": ["Being scared", "Respectful reverence", "Anxiety", "Confusion"],
                "correct_answer": 1,
                "explanation": "'Ubwoba-bwoba' represents respectful reverence in Rwandan culture."
            },
            {
                "id": "cult_010",
                "question": "What is the importance of 'Ubusabane' in daily life?",
                "options": ["Personal gain", "Community harmony", "Individual success", "Competition"],
                "correct_answer": 1,
                "explanation": "'Ubusabane' promotes community harmony through sharing."
            },
            {
                "id": "cult_011",
                "question": "What traditional instrument accompanies Intore dance?",
                "options": ["Inanga", "Ingoma", "Umuduli", "Ikembe"],
                "correct_answer": 1,
                "explanation": "'Ingoma' (drums) traditionally accompany the Intore dance."
            },
            {
                "id": "cult_012",
                "question": "What does 'Kwicuza ubwoba' mean culturally?",
                "options": ["Being brave", "Overcoming respectful hesitation", "Fighting", "Running away"],
                "correct_answer": 1,
                "explanation": "It means overcoming respectful hesitation to participate fully."
            },
            {
                "id": "cult_013",
                "question": "In traditional Rwanda, what was 'Ubuhake'?",
                "options": ["A dance", "A social contract system", "A type of food", "A celebration"],
                "correct_answer": 1,
                "explanation": "'Ubuhake' was a traditional social contract system."
            },
            {
                "id": "cult_014",
                "question": "What is the significance of 'Ubwiyunge' in Rwandan values?",
                "options": ["Quick action", "Patient endurance", "Immediate response", "Aggressive behavior"],
                "correct_answer": 1,
                "explanation": "'Ubwiyunge' represents the value of patient endurance."
            },
            {
                "id": "cult_015",
                "question": "What role do proverbs play in Rwandan culture?",
                "options": ["Entertainment only", "Teaching wisdom", "Showing off", "Wasting time"],
                "correct_answer": 1,
                "explanation": "Proverbs are important tools for teaching wisdom and values."
            }
        ],
        "intermediate": [
            {
                "id": "cult_101",
                "question": "What does 'Ubuntu' philosophy emphasize?",
                "options": ["Individual success", "Interconnectedness of humanity", "Material wealth", "Competition"],
                "correct_answer": 1,
                "explanation": "Ubuntu emphasizes that 'I am because we are' - human interconnectedness."
            },
            {
                "id": "cult_102",
                "question": "What is 'Gacaca'?",
                "options": ["Traditional dance", "Community justice system", "Cooking method", "Farming technique"],
                "correct_answer": 1,
                "explanation": "Gacaca is a traditional community-based justice system in Rwanda."
            },
            {
                "id": "cult_103",
                "question": "What was the role of 'Abashingantahe' in traditional society?",
                "options": ["Warriors", "Mediators/judges", "Farmers", "Traders"],
                "correct_answer": 1,
                "explanation": "'Abashingantahe' were traditional mediators and judges."
            },
            {
                "id": "cult_104",
                "question": "What is 'Ubwoba' in the context of traditional respect?",
                "options": ["Fear only", "Respectful awe", "Hatred", "Indifference"],
                "correct_answer": 1,
                "explanation": "'Ubwoba' includes respectful awe towards authority and elders."
            },
            {
                "id": "cult_105",
                "question": "What does 'Gusabana' represent in Rwandan culture?",
                "options": ["Taking without asking", "Mutual sharing and support", "Individual ownership", "Competition"],
                "correct_answer": 1,
                "explanation": "'Gusabana' represents the cultural value of mutual sharing and support."
            },
            {
                "id": "cult_106",
                "question": "What is the cultural significance of 'Ubwenge'?",
                "options": ["Physical strength", "Wisdom and intelligence", "Wealth", "Beauty"],
                "correct_answer": 1,
                "explanation": "'Ubwenge' represents the highly valued trait of wisdom and intelligence."
            },
            {
                "id": "cult_107",
                "question": "In traditional Rwandan society, what was 'Ubunyangamugayo'?",
                "options": ["Dishonesty", "Integrity and honesty", "Confusion", "Laziness"],
                "correct_answer": 1,
                "explanation": "'Ubunyangamugayo' means integrity and honesty, highly valued traits."
            },
            {
                "id": "cult_108",
                "question": "What role did storytelling ('Ibigambi') play?",
                "options": ["Entertainment only", "Preserving culture and teaching values", "Gossip", "Time wasting"],
                "correct_answer": 1,
                "explanation": "Storytelling preserved culture and taught important values across generations."
            },
            {
                "id": "cult_109",
                "question": "What is 'Ubushingantahe' in cultural context?",
                "options": ["Dictatorship", "Wise mediation", "Chaos", "Selfishness"],
                "correct_answer": 1,
                "explanation": "'Ubushingantahe' represents the tradition of wise mediation and conflict resolution."
            },
            {
                "id": "cult_110",
                "question": "What does 'Ubwiyicuze' mean in Rwandan values?",
                "options": ["Cowardice", "Humble confidence", "Arrogance", "Confusion"],
                "correct_answer": 1,
                "explanation": "'Ubwiyicuze' represents humble confidence, a balanced virtue."
            },
            {
                "id": "cult_111",
                "question": "What was the significance of 'Ubusanze' ceremonies?",
                "options": ["Personal gain", "Community harmony and reconciliation", "Entertainment", "Business"],
                "correct_answer": 1,
                "explanation": "'Ubusanze' ceremonies promoted community harmony and reconciliation."
            },
            {
                "id": "cult_112",
                "question": "In Rwandan culture, what does 'Ubwiyunge' teach about conflict?",
                "options": ["Fight immediately", "Patient resolution", "Avoid completely", "Get revenge"],
                "correct_answer": 1,
                "explanation": "'Ubwiyunge' teaches patient and thoughtful conflict resolution."
            },
            {
                "id": "cult_113",
                "question": "What is the cultural meaning of 'Ubwoba-bwoba'?",
                "options": ["Extreme fear", "Respectful approach to sacred things", "Anxiety disorder", "Weakness"],
                "correct_answer": 1,
                "explanation": "'Ubwoba-bwoba' means respectful approach to sacred or important things."
            },
            {
                "id": "cult_114",
                "question": "What role did 'Inanga' play in traditional culture?",
                "options": ["Just music", "Storytelling and moral teaching", "Noise making", "Showing off"],
                "correct_answer": 1,
                "explanation": "'Inanga' (zither) was used for storytelling and moral teaching through music."
            },
            {
                "id": "cult_115",
                "question": "What does 'Ubwoba bw'Imana' represent?",
                "options": ["Fear of God", "Reverence for the Divine", "Superstition", "Confusion"],
                "correct_answer": 1,
                "explanation": "It represents deep reverence and awe for the Divine (Imana)."
            }
        ],
        "advanced": [
            {
                "id": "cult_201",
                "question": "What is the deeper philosophical meaning of 'Ubwiyunge' in Rwandan thought?",
                "options": ["Simple waiting", "Transformative endurance that builds character", "Passive acceptance", "Procrastination"],
                "correct_answer": 1,
                "explanation": "'Ubwiyunge' represents transformative endurance that builds character and wisdom."
            },
            {
                "id": "cult_202",
                "question": "How does 'Ubwoba-bwoba' relate to the concept of wisdom?",
                "options": ["It doesn't", "It represents the beginning of wisdom through reverence", "It opposes wisdom", "It's unrelated"],
                "correct_answer": 1,
                "explanation": "'Ubwoba-bwoba' is seen as the beginning of wisdom through proper reverence."
            },
            {
                "id": "cult_203",
                "question": "What is the complex meaning of 'Ubushingantahe' in social harmony?",
                "options": ["Simple judgment", "Restorative justice that heals community", "Punishment", "Authority"],
                "correct_answer": 1,
                "explanation": "'Ubushingantahe' embodies restorative justice that heals and strengthens community bonds."
            },
            {
                "id": "cult_204",
                "question": "In traditional Rwandan cosmology, what role does 'Imana' play?",
                "options": ["Distant deity", "Intimate creator present in daily life", "Mythical figure", "Historical person"],
                "correct_answer": 1,
                "explanation": "'Imana' is understood as an intimate creator actively present in daily life."
            },
            {
                "id": "cult_205",
                "question": "What is the sophisticated meaning of 'Ubusabane' in social organization?",
                "options": ["Simple sharing", "Complex reciprocity system ensuring social stability", "Gift giving", "Trade"],
                "correct_answer": 1,
                "explanation": "'Ubusabane' represents a complex reciprocity system that ensures social stability."
            },
            {
                "id": "cult_206",
                "question": "How does 'Ubwenge' relate to collective wisdom in Rwandan culture?",
                "options": ["Individual intelligence only", "Collective intelligence that serves community", "Academic knowledge", "Cleverness"],
                "correct_answer": 1,
                "explanation": "'Ubwenge' encompasses collective intelligence that serves the community good."
            },
            {
                "id": "cult_207",
                "question": "What is the deep cultural significance of 'Gacaca' beyond justice?",
                "options": ["Legal proceeding only", "Community healing and social reconstruction", "Punishment system", "Court proceeding"],
                "correct_answer": 1,
                "explanation": "Gacaca represents community healing and social reconstruction beyond mere justice."
            },
            {
                "id": "cult_208",
                "question": "In Rwandan philosophy, what does 'Ubuntu' reveal about human nature?",
                "options": ["Individualism", "Fundamental interconnectedness of existence", "Competition", "Independence"],
                "correct_answer": 1,
                "explanation": "Ubuntu reveals the fundamental interconnectedness of all human existence."
            },
            {
                "id": "cult_209",
                "question": "What is the epistemological role of proverbs in Rwandan culture?",
                "options": ["Entertainment", "Vehicles for transmitting collective wisdom", "Time fillers", "Decoration"],
                "correct_answer": 1,
                "explanation": "Proverbs serve as vehicles for transmitting collective wisdom across generations."
            },
            {
                "id": "cult_210",
                "question": "How does 'Ubwiyumvire' function in Rwandan social ethics?",
                "options": ["Simple understanding", "Empathetic wisdom that guides moral action", "Intellectual knowledge", "Emotional reaction"],
                "correct_answer": 1,
                "explanation": "'Ubwiyumvire' represents empathetic wisdom that guides moral action in community."
            }
        ]
    },
    "pronunciation": [
        {
            "id": "pron_001",
            "question": "How many syllables are in 'Mwaramutse'?",
            "options": ["3", "4", "5", "6"],
            "correct_answer": 1,
            "explanation": "'Mwaramutse' has 4 syllables: Mwa-ra-mu-tse."
        },
        {
            "id": "pron_002",
            "question": "Which sound is emphasized in 'Muraho'?",
            "options": ["Mu-", "-ra-", "-ho", "All equally"],
            "correct_answer": 3,
            "explanation": "In Kinyarwanda, syllables are generally pronounced with equal emphasis."
        },
        {
            "id": "pron_003",
            "question": "What is the correct pronunciation of 'Kinyarwanda'?",
            "options": ["Kin-yar-wan-da", "Ki-nya-rwan-da", "Ki-nYA-rwan-da", "Ki-nya-RWAN-da"],
            "correct_answer": 1,
            "explanation": "The correct pronunciation is Ki-nya-rwan-da with relatively equal stress."
        },
        {
            "id": "pron_004",
            "question": "How is the 'ny' sound pronounced in Kinyarwanda?",
            "options": ["Like 'ni'", "Like 'nee'", "Like 'ñ' in Spanish", "Like 'knee'"],
            "correct_answer": 2,
            "explanation": "The 'ny' in Kinyarwanda is pronounced like 'ñ' in Spanish."
        },
        {
            "id": "pron_005",
            "question": "What is the stress pattern in 'Ubwiyunge'?",
            "options": ["UB-wi-yu-nge", "U-bwi-YU-nge", "U-bwi-yu-NGE", "Equal stress"],
            "correct_answer": 3,
            "explanation": "Kinyarwanda typically has equal stress on all syllables."
        },
        {
            "id": "pron_006",
            "question": "How do you pronounce the 'rw' in 'Kinyarwanda'?",
            "options": ["Like 'r' then 'w'", "Like 'row'", "Like a rolled 'r' with 'w'", "Like 'ru'"],
            "correct_answer": 2,
            "explanation": "The 'rw' is pronounced as a rolled 'r' followed by 'w'."
        },
        {
            "id": "pron_007",
            "question": "What tone pattern does 'Murakoze' follow?",
            "options": ["High-low-high", "Low-high-low", "All high", "All equal"],
            "correct_answer": 3,
            "explanation": "Kinyarwanda pronunciation emphasizes equal tones rather than tonal patterns."
        },
        {
            "id": "pron_008",
            "question": "How many syllables are in 'Ubwiyungenge'?",
            "options": ["4", "5", "6", "7"],
            "correct_answer": 1,
            "explanation": "'Ubwiyungenge' has 5 syllables: U-bwi-yu-nge-nge."
        },
        {
            "id": "pron_009",
            "question": "What is the correct way to pronounce 'Igikoni'?",
            "options": ["I-gi-ko-ni", "Igi-ko-ni", "I-giko-ni", "Igiko-ni"],
            "correct_answer": 0,
            "explanation": "'Igikoni' is pronounced I-gi-ko-ni with equal syllable stress."
        },
        {
            "id": "pron_010",
            "question": "How do you pronounce the double consonant in 'Ubussabane'?",
            "options": ["Longer hold", "Two separate sounds", "Same as single", "Silent"],
            "correct_answer": 0,
            "explanation": "Double consonants are pronounced with a longer hold."
        },
        {
            "id": "pron_011",
            "question": "What is the vowel sound in 'umuntu'?",
            "options": ["oo-moo-ntoo", "u-man-tu", "oo-man-too", "u-mun-tu"],
            "correct_answer": 0,
            "explanation": "Kinyarwanda 'u' is pronounced like 'oo' in 'book'."
        },
        {
            "id": "pron_012",
            "question": "How do you pronounce 'Gacaca'?",
            "options": ["Ga-ca-ca", "Ga-cha-cha", "Ga-sa-sa", "Ga-ka-ka"],
            "correct_answer": 1,
            "explanation": "'Gacaca' is pronounced Ga-cha-cha with 'c' sounding like 'ch'."
        },
        {
            "id": "pron_013",
            "question": "What is the correct pronunciation of 'Ijoro'?",
            "options": ["I-jo-ro", "I-jo-ro", "Ee-jo-ro", "I-zho-ro"],
            "correct_answer": 2,
            "explanation": "'Ijoro' starts with a long 'ee' sound: Ee-jo-ro."
        },
        {
            "id": "pron_014",
            "question": "How is 'Ubwoba' correctly pronounced?",
            "options": ["Ub-wo-ba", "U-bwo-ba", "Ub-o-ba", "U-bo-ba"],
            "correct_answer": 1,
            "explanation": "'Ubwoba' is pronounced U-bwo-ba with 'bw' as one sound."
        },
        {
            "id": "pron_015",
            "question": "What is the syllable count in 'Ubushingantahe'?",
            "options": ["5", "6", "7", "8"],
            "correct_answer": 1,
            "explanation": "'Ubushingantahe' has 6 syllables: U-bu-shi-ngan-ta-he."
        }
    ],
    "numbers": [
        {
            "id": "num_001",
            "question": "How do you say 'one' in Kinyarwanda?",
            "options": ["Rimwe", "Kabiri", "Gatatu", "Kane"],
            "correct_answer": 0,
            "explanation": "'Rimwe' means 'one' in Kinyarwanda."
        },
        {
            "id": "num_002",
            "question": "What is 'Icumi' in English?",
            "options": ["Five", "Seven", "Ten", "Twenty"],
            "correct_answer": 2,
            "explanation": "'Icumi' means 'ten' in Kinyarwanda."
        },
        {
            "id": "num_003",
            "question": "How do you say 'five' in Kinyarwanda?",
            "options": ["Kane", "Gatanu", "Gatandatu", "Karindwi"],
            "correct_answer": 1,
            "explanation": "'Gatanu' means 'five' in Kinyarwanda."
        },
        {
            "id": "num_004",
            "question": "What is 'Kabiri' in English?",
            "options": ["One", "Two", "Three", "Four"],
            "correct_answer": 1,
            "explanation": "'Kabiri' means 'two' in Kinyarwanda."
        },
        {
            "id": "num_005",
            "question": "How do you say 'three' in Kinyarwanda?",
            "options": ["Gatatu", "Kane", "Gatanu", "Gatandatu"],
            "correct_answer": 0,
            "explanation": "'Gatatu' means 'three' in Kinyarwanda."
        },
        {
            "id": "num_006",
            "question": "What is 'Kane' in English?",
            "options": ["Three", "Four", "Five", "Six"],
            "correct_answer": 1,
            "explanation": "'Kane' means 'four' in Kinyarwanda."
        },
        {
            "id": "num_007",
            "question": "How do you say 'six' in Kinyarwanda?",
            "options": ["Gatanu", "Gatandatu", "Karindwi", "Umunani"],
            "correct_answer": 1,
            "explanation": "'Gatandatu' means 'six' in Kinyarwanda."
        },
        {
            "id": "num_008",
            "question": "What is 'Karindwi' in English?",
            "options": ["Six", "Seven", "Eight", "Nine"],
            "correct_answer": 1,
            "explanation": "'Karindwi' means 'seven' in Kinyarwanda."
        },
        {
            "id": "num_009",
            "question": "How do you say 'eight' in Kinyarwanda?",
            "options": ["Karindwi", "Umunani", "Icyenda", "Icumi"],
            "correct_answer": 1,
            "explanation": "'Umunani' means 'eight' in Kinyarwanda."
        },
        {
            "id": "num_010",
            "question": "What is 'Icyenda' in English?",
            "options": ["Eight", "Nine", "Ten", "Eleven"],
            "correct_answer": 1,
            "explanation": "'Icyenda' means 'nine' in Kinyarwanda."
        },
        {
            "id": "num_011",
            "question": "How do you say 'twenty' in Kinyarwanda?",
            "options": ["Icumi", "Makumyabiri", "Mirongo ibiri", "Ijana"],
            "correct_answer": 2,
            "explanation": "'Mirongo ibiri' means 'twenty' in Kinyarwanda."
        },
        {
            "id": "num_012",
            "question": "What is 'Ijana' in English?",
            "options": ["Fifty", "One hundred", "One thousand", "Ten thousand"],
            "correct_answer": 1,
            "explanation": "'Ijana' means 'one hundred' in Kinyarwanda."
        },
        {
            "id": "num_013",
            "question": "How do you say 'fifteen' in Kinyarwanda?",
            "options": ["Icumi na gatanu", "Cumi na gatanu", "Icumi gatanu", "Makumi gatanu"],
            "correct_answer": 1,
            "explanation": "'Cumi na gatanu' means 'fifteen' in Kinyarwanda."
        },
        {
            "id": "num_014",
            "question": "What is 'Igihumbi' in English?",
            "options": ["One hundred", "One thousand", "Ten thousand", "One million"],
            "correct_answer": 1,
            "explanation": "'Igihumbi' means 'one thousand' in Kinyarwanda."
        },
        {
            "id": "num_015",
            "question": "How do you say 'thirty' in Kinyarwanda?",
            "options": ["Mirongo itatu", "Makumyatatu", "Icumi gatatu", "Amakumi atatu"],
            "correct_answer": 0,
            "explanation": "'Mirongo itatu' means 'thirty' in Kinyarwanda."
        },
        {
            "id": "num_016",
            "question": "What is the pattern for counting 11-19 in Kinyarwanda?",
            "options": ["Icumi + number", "Cumi na + number", "Umunani + number", "Makumi + number"],
            "correct_answer": 1,
            "explanation": "Numbers 11-19 follow the pattern 'Cumi na' + the unit number."
        },
        {
            "id": "num_017",
            "question": "How do you say 'fifty' in Kinyarwanda?",
            "options": ["Mirongo itanu", "Makumyatanu", "Amakumi atanu", "Icumi gatanu"],
            "correct_answer": 0,
            "explanation": "'Mirongo itanu' means 'fifty' in Kinyarwanda."
        },
        {
            "id": "num_018",
            "question": "What does 'Mirongo' refer to in counting?",
            "options": ["Units", "Tens", "Hundreds", "Thousands"],
            "correct_answer": 1,
            "explanation": "'Mirongo' refers to tens in Kinyarwanda counting."
        },
        {
            "id": "num_019",
            "question": "How do you say 'twelve' in Kinyarwanda?",
            "options": ["Icumi kabiri", "Cumi na kabiri", "Makumi abiri", "Ibiri icumi"],
            "correct_answer": 1,
            "explanation": "'Cumi na kabiri' means 'twelve' in Kinyarwanda."
        },
        {
            "id": "num_020",
            "question": "What is 'Mirongo cyenda' in English?",
            "options": ["Eighty", "Ninety", "Seventy", "Sixty"],
            "correct_answer": 1,
            "explanation": "'Mirongo cyenda' means 'ninety' in Kinyarwanda."
        }
    ]
}

class QuizManager:
    """Manages quiz generation and scoring"""
    
    def __init__(self):
        self.questions = QUIZ_QUESTIONS
    
    def get_categories(self) -> List[str]:
        """Get all available categories"""
        return list(self.questions.keys())
    
    def get_difficulties(self, category: str) -> List[str]:
        """Get available difficulties for a category"""
        if category in self.questions:
            if isinstance(self.questions[category], dict):
                return list(self.questions[category].keys())
            else:
                return ["mixed"]
        return []
    
    def generate_quiz(self, category: str = "mixed", difficulty: str = "mixed", 
                     num_questions: int = 10) -> Dict[str, Any]:
        """Generate a random quiz based on parameters"""
        
        available_questions = []
        
        # Collect questions based on category and difficulty
        if category == "mixed":
            # Include all categories
            for cat_name, cat_data in self.questions.items():
                if isinstance(cat_data, dict):
                    # Category has difficulty levels
                    if difficulty == "mixed":
                        for diff_questions in cat_data.values():
                            available_questions.extend(diff_questions)
                    elif difficulty in cat_data:
                        available_questions.extend(cat_data[difficulty])
                else:
                    # Category doesn't have difficulty levels
                    if difficulty == "mixed":
                        available_questions.extend(cat_data)
        elif category in self.questions:
            cat_data = self.questions[category]
            if isinstance(cat_data, dict):
                # Category has difficulty levels
                if difficulty == "mixed":
                    for diff_questions in cat_data.values():
                        available_questions.extend(diff_questions)
                elif difficulty in cat_data:
                    available_questions.extend(cat_data[difficulty])
            else:
                # Category doesn't have difficulty levels
                available_questions.extend(cat_data)
        
        # Randomly select questions
        if len(available_questions) < num_questions:
            selected_questions = available_questions
        else:
            selected_questions = random.sample(available_questions, num_questions)
        
        # Shuffle the questions
        random.shuffle(selected_questions)
        
        # Generate quiz metadata
        quiz_id = f"quiz_{random.randint(1000, 9999)}"
        
        return {
            "quiz_id": quiz_id,
            "category": category,
            "difficulty": difficulty,
            "total_questions": len(selected_questions),
            "questions": selected_questions,
            "created_at": "now"  # You can use datetime if needed
        }
    
    def calculate_score(self, quiz_questions: List[Dict], user_answers: List[int]) -> Dict[str, Any]:
        """Calculate quiz score and provide feedback"""
        
        total_questions = len(quiz_questions)
        correct_answers = 0
        detailed_results = []
        
        for i, question in enumerate(quiz_questions):
            user_answer = user_answers[i] if i < len(user_answers) else -1
            correct_answer = question["correct_answer"]
            is_correct = user_answer == correct_answer
            
            if is_correct:
                correct_answers += 1
            
            detailed_results.append({
                "question_id": question["id"],
                "question": question["question"],
                "user_answer": user_answer,
                "correct_answer": correct_answer,
                "options": question["options"],
                "is_correct": is_correct,
                "explanation": question.get("explanation", "")
            })
        
        percentage = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
        
        # Determine performance level
        if percentage >= 90:
            performance = "excellent"
            feedback = "Excellent work! You have a strong grasp of Kinyarwanda!"
        elif percentage >= 80:
            performance = "good"
            feedback = "Good job! You're doing well with your Kinyarwanda learning."
        elif percentage >= 70:
            performance = "fair"
            feedback = "Fair performance. Keep practicing to improve your skills!"
        elif percentage >= 60:
            performance = "needs_improvement"
            feedback = "You're making progress, but more practice would help."
        else:
            performance = "poor"
            feedback = "Don't worry! Learning takes time. Keep practicing and you'll improve!"
        
        return {
            "total_questions": total_questions,
            "correct_answers": correct_answers,
            "percentage": round(percentage, 1),
            "performance": performance,
            "feedback": feedback,
            "detailed_results": detailed_results
        }

# Global quiz manager instance
quiz_manager = QuizManager()

def get_quiz_categories():
    """Get all available quiz categories"""
    return quiz_manager.get_categories()

def get_quiz_difficulties(category: str):
    """Get available difficulties for a category"""
    return quiz_manager.get_difficulties(category)

def create_random_quiz(category: str = "mixed", difficulty: str = "mixed", num_questions: int = 10):
    """Create a random quiz"""
    return quiz_manager.generate_quiz(category, difficulty, num_questions)

def score_quiz(quiz_questions: List[Dict], user_answers: List[int]):
    """Score a completed quiz"""
    return quiz_manager.calculate_score(quiz_questions, user_answers) 