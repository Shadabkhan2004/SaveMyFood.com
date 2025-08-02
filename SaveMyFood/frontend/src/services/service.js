export const signupService = async (name,email,password) => {
  const response = await fetch('http://localhost:3000/api/auth/signup',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({name,email,password})
  });
  const result = await response.json();
  return result;
}

export const loginService = async (email,password) => {
  const response = await fetch('http://localhost:3000/api/auth/login',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  });
  const result = await response.json();
  return result;
}

export const pantryPostService = async (name , quantity , expiryDate , category) => {
  const response = await fetch('http://localhost:3000/api/pantry',{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem('token')
    },
    body:JSON.stringify({name,quantity,expiryDate,category})
  });
  const result = await response.json();
  return result;
}

export const pantryGetService = async () => {
  const response = await fetch(`http://localhost:3000/api/pantry`,{
    method:"GET",
    headers:{
      "Authorization":localStorage.getItem('token')
    },
  });
  const result = await response.json();
  return result;
}

export const pantryDeleteService = async (id) => {
  const response = await fetch(`http://localhost:3000/api/pantry/${id}`,{
    method:"DELETE",
    headers:{
      "Authorization":localStorage.getItem('token')
    },
  });
  const result = await response.json();
  return result;
}

export const pantryPutService = async (id,name,quantity,expiryDate,category) => {
  const response = await fetch(`http://localhost:3000/api/pantry/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem('token')
    },
    body:JSON.stringify({name,quantity,expiryDate,category})
  });
  const result = await response.json();
  return result;
}