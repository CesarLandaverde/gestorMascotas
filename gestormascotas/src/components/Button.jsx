const Button=({onclick,type,text})  =>{
return (
<button type={type}
onclick={onclick}
className="bg-lime-700 text-lg text-white font-bold hover:bg-lime-900 rounded-xl py-3 px-5">
    {text}
    
</button>
);
}

export default Button;