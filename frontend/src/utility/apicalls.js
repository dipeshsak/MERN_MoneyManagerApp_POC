export const loginApiCall = async (formData) => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send formData as JSON
      });

      const data = await response.json();
      console.log("login data ",data)
      return data
   
    } catch (err) {
      return err
    }
  };

  export const signinApiCall = async (formData) => {
    try {
      const response = await fetch('/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send formData as JSON
      });

      const data = await response.json();
      console.log("sign in data ",data)
      return data
   
    } catch (err) {
      return err
    }
  };


  