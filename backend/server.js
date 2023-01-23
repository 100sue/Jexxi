const express = require('express');
const cors = require('cors');
const dotenv = require ('dotenv').config();

const app = express();

// Configuration de l'openai (voir https://beta.openai.com/docs/api-reference/making-requests)

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apikey: process.env.OPENAI_API_KEY, })
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

// Configuration de la réponse de l'IA :
// Model: Le modele choisit.
// Temperature est le degré de créativité de la réponse (echelle de 0 à 0.9).
// Max_tokens: Le nombre maximum de jetons à générer dans la reponse.
// Top_p est une alternative à la temperature, nommé échantillonnage par noyau (nucleus sampling): le modèle considère les résultats des jetons avec une masse de probabilité top_p. 
//    => "0,1" signifie que seuls les jetons comprenant la masse de probabilité supérieure de 10 % sont pris en compte.
// Frequency_penalty: Nombre compris entre -2,0 et 2,0. Les valeurs positives pénalisent les nouveaux jetons en fonction de leur fréquence existante dans le texte jusqu'à présent, 
//    => ce qui réduit la probabilité que le modèle répète la même ligne textuellement.
// Presence_penalty : Nombre compris entre -2,0 et 2,0. Les valeurs positives pénalisent les nouveaux jetons en fonction de leur apparition dans le texte jusqu'à présent, 
//    => ce qui augmente la probabilité que le modèle parle de nouveaux sujets.


app.post("/", async (req, res) => {
    try {
      const question = req.body.question;
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${question}`,
        temperature: 0, 
        max_tokens: 3000, 
        top_p: 1, 
        frequency_penalty: 0.5,
        presence_penalty: 0,  
      });
      res.status(200).send({
        bot: response.data.choices[0].text,
      });
    } catch (error) {
      res.status(500).send(error || "Something went wrong");
    }
  });

app.listen(4001, () => {
    console.log("Server started at http://localhost:4001");
  });