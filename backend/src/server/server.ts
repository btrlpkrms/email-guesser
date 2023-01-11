import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3001;

interface EmailResponse {
    email: string;
}

app.get("/guess-email", (req, res) => {
    let fullName = req.query.fullName;
    let companyDomain = req.query.companyDomain;
    if (!fullName || typeof fullName !== 'string' || !companyDomain || typeof companyDomain !== 'string') {
        return res.status(400).json({error: 'Full name and company domain are required and should be string.'});
    }
    if (!/^[A-Za-z ]+$/.test(fullName)) {
        return res.status(400).json({error: 'Only English Alphabetical Characters Allowed For Full Name.'});
    }
    const email = guessEmail(fullName, companyDomain);
    res.json({email} as EmailResponse);
});

const guessEmail = (fullName: string, companyDomain: string) => {
    let nameArray = fullName.split(" ")
    return nameArray[0]?.toLowerCase().charAt(0) + (nameArray[nameArray.length - 1] || '').toLowerCase() + "@" +
        companyDomain.toLowerCase() + ".com"
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});