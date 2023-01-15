import express from 'express';
import cors from 'cors';
const PORT = 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

interface EmailResponse {
    email: string;
}

interface DataModel {
    [fullName: string]: string;

}

/**
 * Sample dataset for guessing emails.
 */
let sampleData: DataModel = {
    "Jane Doe": "jdoe@babbel.com",
    "Jay Arun": "jayarun@linkedin.com",
    "David Stein": "davidstein@google.com",
    "Mat Lee": "matlee@google.com",
    "Marta Dahl": "mdahl@babbel.com",
    "Vanessa Boom": "vboom@babbel.com"
}

/**
 *
 * @param emailFormat Derived email format from sample dataset
 * @param fullName Full Name
 * @param companyDomain Company Name
 */
const guessEmail = (emailFormat: string, fullName: string, companyDomain: string) => {
    let nameArray = fullName.split(" ")
    if (emailFormat === "first_name_last_name") {
        return nameArray[0]?.toLowerCase() + (nameArray[nameArray.length - 1]).toLowerCase() + "@" +
            companyDomain.toLowerCase() + ".com"
    } else {
        return nameArray[0]?.toLowerCase().charAt(0) + (nameArray[nameArray.length - 1]).toLowerCase() + "@" +
            companyDomain.toLowerCase() + ".com"
    }
}

/**
 * Get full name and company return email.
 */
app.get("/guess-email", (req, res) => {
    let {fullName, companyDomain} = req.query as { fullName: string, companyDomain: string };
    if (!fullName || !companyDomain) {
        return res.status(400).json({error: 'Full name and company domain are required.'});
    }
    if (!/^[A-Za-z ]+$/.test(fullName)) {
        return res.status(400).json({error: 'Only English Alphabetical Characters Allowed For Full Name.'});
    }
    let emailFormat: string = "first_name_last_name";
    Object.entries(sampleData).forEach(([fullName, email]) => {
        if (email.split('@')[1].split(".")[0] === companyDomain.toLowerCase()) {
            emailFormat = email.split('@')[0].startsWith(fullName.split(" ")[0]) ? "first_name_last_name" : "first_name_initial_last_name";
        }
    })

    const email = guessEmail(emailFormat, fullName, companyDomain);
    res.json({email} as EmailResponse);
});


/**
 * Store sample data.
 */
app.post('/sampleData', (req, res) => {
    if (!req.body) {
        return res.status(400).send({error: 'Missing sample data in request body.'});
    }
    try {
        sampleData = {...req.body};
        res.status(200).send({sampleData: sampleData, message: 'Sample data stored successfully.'});
    } catch (e) {
        res.status(500).send({error: 'An error occurred while storing sample data.'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});