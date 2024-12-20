# NodeProjectSkeleton

Este es un proyecto base para Node.js que incluye una configuración inicial con las dependencias más comunes para el desarrollo de APIs REST.

## Requisitos Previos

- Node.js instalado en tu sistema
- npm (Node Package Manager)
- Git instalado en tu sistema


## Primeros Pasos

### 1. Clonar el Proyecto Base
```bash
git clone https://github.com/Adrieliyo/NodeProjectSkeleton.git
```

### 2. Acceder al Directorio
```bash
cd repositorio-original-clonado
```

### 3. Gestionar Repositorio Remoto

#### 3.1 Verificar Repositorio Remoto Actual
```bash
git remote -v
```

#### 3.2 Eliminar Referencia al Repositorio Original
```bash
git remote remove origin
```

### 4. Crear Nuevo Repositorio en GitHub

1. Ve a GitHub y crea un nuevo repositorio
2. **IMPORTANTE**: No inicialices el repositorio con:
   - README
   - .gitignore
   - Licencia
   
   Esto evitará conflictos con los archivos existentes.

### 5. Vincular con tu Nuevo Repositorio

#### 5.1 Agregar Nuevo Remoto
```bash
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
```

#### 5.2 Verificar Nuevo Remoto
```bash
git remote -v
```

#### 5.3 Subir el Código
```bash
# Renombrar la rama principal si es necesario
git branch -M main

# Subir los cambios
git push -u origin main
```

### 6. Verificación Final
Visita tu repositorio en GitHub para confirmar que todos los archivos se subieron correctamente.

## Instalación Rápida

Para instalar todas las dependencias de una sola vez, ejecuta:

```bash
npm i
```

## Instalación Paso a Paso

Si prefieres realizar la instalación paso a paso:

1. Inicializar el proyecto npm:
```bash
npm init -y
```

2. Instalar las dependencias necesarias:
```bash
npm install express morgan cors dotenv nodemon bcrypt jsonwebtoken
```

## Dependencias Incluidas

- **express**: Framework web rápido y minimalista para Node.js
- **morgan**: Middleware de logging para HTTP
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing)
- **dotenv**: Carga variables de entorno desde un archivo .env
- **nodemon**: Utilidad que monitorea cambios en los archivos y reinicia automáticamente el servidor
- **bcrypt**: Librería para el hash de contraseñas
- **jsonwebtoken**: Implementación de JSON Web Tokens

## Estructura del Proyecto

El proyecto sigue una estructura básica recomendada para aplicaciones Node.js:

```
NodeProjectSkeleton/
├── node_modules/
├── src/
│   ├── app/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── test/
├── .env
├── .gitignore
└── package.json
```

## Scripts Disponibles

En el `package.json` se incluyen los siguientes scripts:

```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
}
```

## Uso

1. Sigue los "Primeros Pasos" para clonar y configurar el repositorio
2. Instala las dependencias usando el método rápido o paso a paso
3. Crea un archivo `.env` basado en `.env.example`
4. Ejecuta el servidor:
   - Para desarrollo: `npm run dev`
   - Para producción: `npm start`