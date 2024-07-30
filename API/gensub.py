# for videos without subtitles
# generate subtitles in desired language 
from playsound import playsound 
import speech_recognition as sr 
from googletrans import Translator 
from gtts import gTTS 
import os 
flag = 0
 
dic = ('afrikaans', 'af', 'albanian', 'sq', 
	'amharic', 'am', 'arabic', 'ar', 
	'armenian', 'hy', 'azerbaijani', 'az', 
	'basque', 'eu', 'belarusian', 'be', 
	'bengali', 'bn', 'bosnian', 'bs', 'bulgarian', 
	'bg', 'catalan', 'ca', 'cebuano', 
	'ceb', 'chichewa', 'ny', 'chinese (simplified)', 
	'zh-cn', 'chinese (traditional)', 
	'zh-tw', 'corsican', 'co', 'croatian', 'hr', 
	'czech', 'cs', 'danish', 'da', 'dutch', 
	'nl', 'english', 'en', 'esperanto', 'eo', 
	'estonian', 'et', 'filipino', 'tl', 'finnish', 
	'fi', 'french', 'fr', 'frisian', 'fy', 'galician', 
	'gl', 'georgian', 'ka', 'german', 
	'de', 'greek', 'el', 'gujarati', 'gu', 
	'haitian creole', 'ht', 'hausa', 'ha', 
	'hawaiian', 'haw', 'hebrew', 'he', 'hindi', 
	'hi', 'hmong', 'hmn', 'hungarian', 
	'hu', 'icelandic', 'is', 'igbo', 'ig', 'indonesian', 
	'id', 'irish', 'ga', 'italian', 
	'it', 'japanese', 'ja', 'javanese', 'jw', 
	'kannada', 'kn', 'kazakh', 'kk', 'khmer', 
	'km', 'korean', 'ko', 'kurdish (kurmanji)', 
	'ku', 'kyrgyz', 'ky', 'lao', 'lo', 
	'latin', 'la', 'latvian', 'lv', 'lithuanian', 
	'lt', 'luxembourgish', 'lb', 
	'macedonian', 'mk', 'malagasy', 'mg', 'malay', 
	'ms', 'malayalam', 'ml', 'maltese', 
	'mt', 'maori', 'mi', 'marathi', 'mr', 'mongolian', 
	'mn', 'myanmar (burmese)', 'my', 
	'nepali', 'ne', 'norwegian', 'no', 'odia', 'or', 
	'pashto', 'ps', 'persian', 'fa', 
	'polish', 'pl', 'portuguese', 'pt', 'punjabi', 
	'pa', 'romanian', 'ro', 'russian', 
	'ru', 'samoan', 'sm', 'scots gaelic', 'gd', 
	'serbian', 'sr', 'sesotho', 'st', 
	'shona', 'sn', 'sindhi', 'sd', 'sinhala', 'si', 
	'slovak', 'sk', 'slovenian', 'sl', 
	'somali', 'so', 'spanish', 'es', 'sundanese', 
	'su', 'swahili', 'sw', 'swedish', 
	'sv', 'tajik', 'tg', 'tamil', 'ta', 'telugu', 
	'te', 'thai', 'th', 'turkish', 
	'tr', 'ukrainian', 'uk', 'urdu', 'ur', 'uyghur', 
	'ug', 'uzbek', 'uz', 
	'vietnamese', 'vi', 'welsh', 'cy', 'xhosa', 'xh', 
	'yiddish', 'yi', 'yoruba', 
	'yo', 'zulu', 'zu') 

# input audio file
audio_file = 'API\harvard.wav'

r = sr.Recognizer() 
with sr.AudioFile(audio_file) as source:
	print("listening.....")
	audio = r.record(source) 

try: 
	print("Recognizing.....") 
	query = r.recognize_google(audio) 
	print(f"The User said {query}\n") 
except Exception as e: 
	print("say that again please.....") 


to_lang = input('enter your desired language')


while (to_lang not in dic): 
	print('''Language in which you are trying 
	to convert is currently not available ,
	please input some other language''') 
	print() 
	to_lang = input('enter your desired lanugage')

to_lang = dic[dic.index(to_lang)+1] 


# invoking Translator 
translator = Translator() 

# Translating from src to dest 
text_to_translate = translator.translate(query, dest=to_lang) 

text = text_to_translate.text 

speak = gTTS(text=text, lang=to_lang, slow=False) 

speak.save("captured_voice.mp3") 

# Using OS module to run the translated voice. 
playsound('captured_voice.mp3') 
os.remove('captured_voice.mp3') 

# Printing Output 
print(text) 
