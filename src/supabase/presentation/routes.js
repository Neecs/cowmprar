const express = require('express');
const { loginUser, recoverPassword} = require('../usecases/auth');
const { getAllUsers } = require('../usecases/fetch_data')
const { createCow } = require('../usecases/cows/create_cow')
const { registerUser} = require('../usecases/user/create_user')
const {getPersonByEmail, getPossibleDocuments, getRoles} = require("../usecases/user/fetch_user");
const {getRazes, getGenders, getCow} = require("../usecases/cows/get_cow");

export const router = express.Router();

router.get('/data', async (req, res) => {
    try {
        const data = await getAllUsers();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Ruta de registro
router.post('/register', async (req, res) => {
    try {
        const {  email, password, doc_id, first_name, last_name, role_id, phone, doc_type } = req.body;
        const user = await registerUser( email, password, doc_id, first_name, last_name, role_id, phone, doc_type);
        console.log(user)
        if (user === false) {
            res.json({error: "The user already exists"});
        } else {
            res.json({success:"The user was created"});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register user in supabase auth table
router.post('/register-auth', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await loginUser(email, password);
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { email, new_password} = req.body;
        const user = await recoverPassword(email, new_password);
        res.json({user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(password)
        const user = await loginUser(email, password);
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/person', async (req,res) => {
    try{
        const email = req.query.email;
        const person = await getPersonByEmail(email);
        res.json(person)
    }catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.get('/document-types', async (req,res) => {
    try {
        const documents = await getPossibleDocuments()
        res.json(documents)
    }catch (error){
        res.status(500).json({error:error.message})
    }
})

router.get('/create-cow', async (req, res) => {
    try {
        const raze = req.body.raze;
        const gender = req.body.gender;
        const birth_date = req.body.birth_date;

        await createCow(raze,gender,birth_date);
        res.json({sucess:"Your cow was created"})
    }catch (error){
        res.status(500).json({error:error.message})
    }
})

router.get('/cow-razes', async (req,res) => {
    try {
        const cowRazes = await getRazes()
        res.json(cowRazes)
    }catch (error){
        res.status(500).json({error:error.message})
    }
})

router.get('/cow-information', async (req,res) => {
    try {
        const cow_id = req.body.cow_id;
        const cowInfo = await getCow(cow_id)
        res.json(cowInfo)
    }catch (error){
        res.status(500).json({error:error.message})
    }
})

router.get('/cow-genders', async (req,res) => {
    try {
        const cowGenders = await getGenders()
        res.json(cowGenders)
    }catch (error){
        res.status(500).json({error:error.message})
    }
})


router.get('/app-roles', async (req,res) => {
    try {
        const appRoles = await getRoles()
        res.json(appRoles)
    }catch (error){
        res.status(500).json({error:error.message})
    }
})


