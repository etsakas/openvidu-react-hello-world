Εκτελω
npx create-react-app openvidu-react-hello-world
αρχικα για την δημιουργια του react project.

Μετα για να κανω εγκατασταση του openvidu library, μπαινω στον φακελο
frontend που δημιουργηθηκε και εκτελω
npm install openvidu-react --save
npm install axios --save

Βαζω το --save ωστε να αποθηκευθει τα depedencies του openvidu-react στο αρχειο package.json ωστε την επομενη φορα να εκτελω μονο npm install

Μου βγαζει καποια σφαλματα ομως, κυριως warnings. Θα τα αγνοησω και ελπιζω να μην εχω προβλημα.

Εκτελω
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.18.0

Μεσα στον φακελο frontend εκτελω npm start
