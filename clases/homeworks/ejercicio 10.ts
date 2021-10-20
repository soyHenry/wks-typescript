interface Instructor {
    name: string;
    age: number;
  }
  
  function infoInstructor(inst: Instructor) {
    console.log(`${inst.name} - ${inst.age} years old`);
  }
  
  const noTypeVar = {name: "Franco", age: 26};
  
  infoInstructor(noTypeVar); // "Franco - 26 years old"