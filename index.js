```javascript
function deepCopy(obj, hash = new WeakMap()) {
  // Проверка наличия циклических ссылок для избежания бесконечной рекурсии
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Обработка null, undefined и примитивных типов
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Обработка даты
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Обработка массивов
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((val, idx) => {
      arrCopy[idx] = deepCopy(val, hash);
    });
    return arrCopy;
  }

  // Обработка Map
  if (obj instanceof Map) {
    const mapCopy = new Map();
    hash.set(obj, mapCopy);
    obj.forEach((value, key) => {
      mapCopy.set(key, deepCopy(value, hash));
    });
    return mapCopy;
  }

  // Обработка Set
  if (obj instanceof Set) {
    const setCopy = new Set();
    hash.set(obj, setCopy);
    obj.forEach(value => {
      setCopy.add(deepCopy(value, hash));
    });
    return setCopy;
  }

  // Создание копии объекта с учетом прототипа
  const objCopy = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, objCopy);

  // Копирование всех свойств, включая символы и функции
  Reflect.ownKeys(obj).forEach(prop => {
    objCopy[prop] = deepCopy(obj[prop], hash);
  });

  return objCopy;
}

// Пример использования:
const original = { 
  number: 1, 
  bool: false, 
  str: 'text', 
  sym: Symbol('sym'), 
  func: function() {}, 
  obj: { nested: 'nested' }, 
  arr: [2, 4, { deep: 'copy' }], 
  date: new Date(), 
  map: new Map([['key', 'value']]), 
  set: new Set([1, 2, 3])
};

const copy = deepCopy(original);
console.log(copy);
```

В приведенном выше коде определена функция `deepCopy`, которая выполняет глубокую копию переданного ей объекта. Она корректно обрабатывает типы данных, такие как `Object`, `Array`, `Date`, `Map`, `Set`, а также функции, символы, и сохраняет прототип исходного объекта.

Для отслеживания циклических ссылок используется объект `WeakMap` — это позволяет избежать бесконечной рекурсии в случае встречи уже обработанных объектов. Для перебора всех свойств объекта, включая символьные ключи и не перечисляемые свойства, используется метод `Reflect.ownKeys`.
