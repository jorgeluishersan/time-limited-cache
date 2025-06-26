class TimeLimitedCache { // Guarda valores que tienen fecha de caducidad
    constructor() { //Prepara un lugar donde guardar los datos
      this.store = new Map(); 
      // 🗃️ Almacena cada clave junto con su valor y su tiempo de expiración
    }
  
    set(key, value, duration) { // Guarda clave con duracion limitada
      const now = Date.now();  // Soy el reloj, me llamas cuando quieras guardar una nueva clave 
  
      const isActive = this.store.has(key) && this.store.get(key).expiresAt > now;
      // ✅ Verifica si la clave ya existe y aún no ha expirado
  
      this.store.set(key, {
        value: value,
        expiresAt: now + duration
      });
      // 📦 Guarda (o reemplaza) la clave con su valor y la nueva hora de expiración
  
      return isActive;
      // 🔁 Devuelve true si la clave ya estaba activa, false si es nueva o ya había expirado
    }
  
    get(key) { // Quieres saber si una clave sigue viva?
      const now = Date.now(); // Otra vez el reloj, veamos si ya paso el tiempo
      
  
      const entry = this.store.get(key); 
      // 🔍 Busca la clave en mi cajon de datos. Si la encuentro, sigo revisando su fecha
  
      if (entry && entry.expiresAt > now) { // ✅ Si existe y aún no expira, devuelve su valor
        return entry.value; 
        // Aqui tienes el valor. Aun esta vigente
      }
  
      return -1;
      // ❌ Lo siwnto esa clave ya caduco o nunca existio. Te regreso -1
    }
  
    count() { // Quieres saber cuantas claves siguen activas. Yo te lo digo
      const now = Date.now(); // Revisemos la hora actual para filtrar que claves siguen vivas
  
      let count = 0; //Preparo un contador para ir sumando las claves que sobreviven
  
      for (const entry of this.store.values()) { // Voy a revisar una por una cada clave guardada para ver si ya caducaron
        if (entry.expiresAt > now) { // Esta todavia no se vence, asi que la cuento
          count++; // 📈 Suma si la clave todavía está activa
        }
      }
  
      return count; // 🔢 Devuelve cuántas claves activas hay en este momento
    }
  }
  
  const cache = new TimeLimitedCache();
  
  function setKey() {
    const key = parseInt(document.getElementById("keyInput").value);
    const value = document.getElementById("valueInput").value;
    const duration = parseInt(document.getElementById("durationInput").value);
  
    const wasActive = cache.set(key, value, duration);
    document.getElementById("output").textContent = wasActive
      ? "🔁 Ya existía (no expirado)"
      : "🆕 Nuevo o expirado";
  }
  
  function getKey() {
    const key = parseInt(document.getElementById("keyInput").value);
    const result = cache.get(key);
    document.getElementById("output").textContent =
      result === -1 ? "❌ No encontrado o expirado" : `✅ Valor: ${result}`;
  }
  
  function countKeys() {
    const count = cache.count();
    document.getElementById("output").textContent = `📦 Claves activas: ${count}`;
  }