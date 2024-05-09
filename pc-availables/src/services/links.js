// links.js

const enlaces = {
    1: "campusm://uniloc?posCode=1000018477",
    2: "campusm://uniloc?posCode=1000018478",
    3: "campusm://uniloc?posCode=1000018478",
    4: "campusm://uniloc?posCode=1000018480",
    5: "campusm://uniloc?posCode=1000019249",
    6: "campusm://uniloc?posCode=1000018481",
    7: "campusm://uniloc?posCode=1000018481",
    8: "campusm://uniloc?posCode=1000018479",
    9: "campusm://uniloc?posCode=1000018479",
    10: "campusm://uniloc?posCode=1000018479"
  };
  
  export const getEnlace = (id) => {
    return enlaces[id] || ""; // Devolver el enlace correspondiente o una cadena vacía si no se encuentra
};
  