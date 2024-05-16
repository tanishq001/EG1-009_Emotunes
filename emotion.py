import os
import cv2
import numpy as np
from keras.preprocessing import image
import warnings
warnings.filterwarnings("ignore")
from keras.models import  load_model
import numpy as np

class EmotionDetection:
    def __init__(self) -> None:
        self.model = load_model("Emotunes.h5")
        self.face_haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        pass

    def moodNamePrintFromLabel(self,n):
            if n == 0: result = 'Angry'
            elif n == 1: result = 'Disgust'
            elif n == 2: result = 'Fear'
            elif n == 3: result = 'Happy'
            elif n == 4: result = 'Sad'
            elif n == 5: result = 'Surprise'
            elif n == 6: result = 'Neutral'
            return result

    def process(self, file):
        predicted_emotion = ''
        if file:
            cap = cv2.VideoCapture(file)
            width = int(cap.get(3))
            height = int(cap.get(4))
            print(width, height)
            result = cv2.VideoWriter(f'{file}-out.mp4', cv2.VideoWriter_fourcc(*'mp4v'), fps=30, frameSize=(width, height)) 
            f= 0
            while True:
                ret, test_img = cap.read()
                print(f)
                f+=1
                if not ret:
                    break 
                gray_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2GRAY)
                faces_detected = self.face_haar_cascade.detectMultiScale(gray_img, 1.32, 5)
                for (x, y, w, h) in faces_detected:
                    print(faces_detected)
                    # cv2.rectangle(test_img, (x, y), (x + w, y + h), (255, 255, 255), thickness=2)
                    roi_gray = gray_img[y:y + h, x:x + w]  # cropping region of interest i.e. face area from  image
                    resized_face = cv2.resize(roi_gray, (48, 48),interpolation = cv2.INTER_AREA)
                    normalized_face = resized_face / 255.0
                    reshaped_face = normalized_face.reshape(1, 48, 48, 1)
                    
                    img_pixels = image.img_to_array(roi_gray)
                    img_pixels = np.expand_dims(img_pixels, axis=0)
                    img_pixels /= 255
                    # resized_img = np.reshape(roi_gray,(1,48,48,1))/255.0
                   
                    # print(predicted_emotion)

                    result = np.argmax(self.model.predict(reshaped_face))
                    predicted_emotion = self.moodNamePrintFromLabel(result)
                    if result is not None:
                        print(self.moodNamePrintFromLabel(result))

                    cv2.putText(test_img, predicted_emotion, (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

                resized_img = cv2.resize(test_img, (width, height))
                # cv2.imwrite(f"{file.split('.')[0]}-image.jpeg", resized_img)
                # result.write(resized_img)
            cap.release()
            # result.release()
            return predicted_emotion