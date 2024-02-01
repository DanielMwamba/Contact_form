import "./App.css";
import {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";


function App() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: 18,
    gender: "",
  });

  const {register, handleSubmit, reset, formState:{errors}} = useForm({defaultValues: formData});

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://65ba44e7b4d53c06655271e6.mockapi.io/contact/v1/users", data);
      console.log(response.data);
      alert("Données envoyées avec succès");
      reset();
      
    } catch (error) {
      console.error("Une erreur s'est produite:", error);
      alert("Une erreur s'est produite lors de l'envoi des données");
    }
  }

  
  return (

    <main className="flex items-center h-screen w-full bg-teal-300">
    <div className="w-full p-8 bg-white rounded m-4 md:max-w-sm md:mx-auto">
      <h1 className="block w-full text-center text-neutral-600 mb-6 text-xl font-bold"> Formulaire de Contact </h1>
      <div>
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-lg text-neutral-600">Nom</label>
            <input className="border py-2 px-3 text-grey-darkest" type="text" name="name" 
              {...register("name", {
                required: "Ce champ est obligatoire",
              })} />

            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-lg text-neutral-600">Telephone</label>
            <input className="border py-2 px-3 text-neutral-600" type="text" name="phone" 
              {...register("phone", {
                required: "Ce champ est obligatoire",
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: "Le numéro de téléphone doit contenir 10 chiffres",
                }
  
            })} />

             {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            
            <div className="flex flex-col mb-4">
              <label className="mb-2 uppercase font-bold text-lg text-neutral-600">Email</label>
              <input className="border py-2 px-3 text-neutral-600" type="email" name="email" {...register("email", {
                required: "Ce champ est obligatoire",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "L'email n'est pas valide",
                }
              })} />
              
               {errors.email && <p className="text-red-500">{errors.email.message}</p>} 
              
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2 uppercase font-bold text-lg text-neutral-600">Age</label>
              <input className="border py-2 px-3 text-neutral-600" type="number" name="age" {...register("age",
                {
                  required: "Ce champ est obligatoire",
                  min: {
                    value: 18,
                    message: "Vous devez avoir au moins 18 ans pour utiliser ce formulaire",
                  }
                })} />

               {errors.age && <p className="text-red-500">{errors.age.message}</p>}
              
            </div> 

            <div className="flex flex-col mb-4">
              <label className="mb-2 uppercase font-bold text-lg text-neutral-600">Genre</label>
              <select className="border py-2 px-3 text-neutral-600" {...register("gender")} >
                <option value="femme">Femme</option>

                <option value="homme">Homme</option>

                <option value="autres">Autres</option>
              </select>
            </div>
            <button className="block bg-teal-300 hover:bg-teal-darktext-neutral-600 uppercase text-lg mx-auto p-4 rounded" type="submit">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
    </main>
  );
}

export default App;
