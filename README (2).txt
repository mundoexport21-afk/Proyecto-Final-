# 📊 Proyecto Completo de Machine Learning - Análisis de Exportaciones Colombianas

## 🎯 Descripción del Proyecto

Sistema integral de Machine Learning para análisis y predicción de exportaciones colombianas, que incluye:
- **7 Modelos de ML** (6 supervisados + 1 no supervisado)
- **Análisis Exploratorio (EDA)** y **Transformación de Datos (ETL)**
- **Aplicación FullStack** con interfaz web interactiva
- **Documentación completa** con notebooks Jupyter

---

## 📁 Estructura del Proyecto

```
ml_project/
│
├── 📊 DATA
│   ├── DATAPROYECTO.xlsx          # Dataset original (80,000 registros)
│   ├── data_clean.csv              # Datos limpios
│   ├── data_processed.csv          # Datos procesados para ML
│   └── data_numeric.csv            # Solo variables numéricas
│
├── 📓 NOTEBOOKS
│   ├── 01_EDA_ETL.ipynb           # Análisis exploratorio y limpieza
│   ├── 02_Regresion_Lineal.ipynb  # Modelo de regresión
│   ├── 03_Regresion_Logistica.ipynb # Clasificación multiclase
│   ├── 04_KNN.ipynb                # K-Nearest Neighbors
│   ├── 05_SVM.ipynb                # Support Vector Machine
│   ├── 06_Arboles_Decision.ipynb   # Árboles de decisión
│   ├── 07_Naive_Bayes.ipynb        # Naive Bayes
│   ├── 08_KMeans.ipynb             # Clustering K-Means
│   └── 09_Comparativo_Integrador.ipynb # Comparación y selección
│
├── 🤖 MODELOS ENTRENADOS
│   ├── model_regresion_lineal.pkl
│   ├── model_regresion_logistica.pkl
│   ├── model_knn.pkl
│   ├── model_svm.pkl
│   ├── model_decision_tree.pkl
│   ├── model_naive_bayes.pkl
│   ├── model_kmeans.pkl
│   └── best_model_selection.pkl
│
├── 🌐 APLICACIÓN FULLSTACK
│   ├── app.py                      # Backend Flask
│   ├── templates/
│   │   └── index.html              # Frontend HTML
│   └── static/
│       ├── css/
│       └── js/
│
├── 📄 DOCUMENTACIÓN
│   ├── README.md                   # Este archivo
│   ├── INSTALLATION.md             # Guía de instalación
│   ├── API_DOCUMENTATION.md        # Documentación de API
│   └── USER_GUIDE.md               # Guía de usuario
│
└── 🔧 UTILIDADES
    └── generate_all_notebooks.py   # Script generador
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- 8GB RAM mínimo
- 2GB espacio en disco

### Paso 1: Clonar/Descargar el Proyecto

```bash
# Si estás usando git
git clone <repository-url>
cd ml_project

# O simplemente descomprime el archivo ZIP
```

### Paso 2: Crear Entorno Virtual (Recomendado)

```bash
# Windows
python -m venv venv
venv\\Scripts\\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Paso 3: Instalar Dependencias

```bash
pip install -r requirements.txt
```

**Dependencias principales:**
- pandas >= 1.5.0
- numpy >= 1.23.0
- scikit-learn >= 1.2.0
- matplotlib >= 3.6.0
- seaborn >= 0.12.0
- flask >= 2.3.0
- flask-cors >= 4.0.0
- openpyxl >= 3.1.0
- jupyter >= 1.0.0
- scipy >= 1.10.0

### Paso 4: Ejecutar Notebooks (Opcional)

```bash
jupyter notebook
```

Luego abre los notebooks en orden:
1. `01_EDA_ETL.ipynb` - Para procesar los datos
2. `02_Regresion_Lineal.ipynb` a `08_KMeans.ipynb` - Para entrenar modelos
3. `09_Comparativo_Integrador.ipynb` - Para comparar modelos

### Paso 5: Iniciar Aplicación Web

```bash
python app.py
```

La aplicación estará disponible en: **http://localhost:5000**

---

## 📊 Dataset

### Información General

- **Nombre**: DATAPROYECTO.xlsx
- **Registros**: 80,000 exportaciones
- **Variables**: 30 columnas
- **Período**: Datos de exportaciones colombianas
- **Tamaño**: ~17 MB

### Variables Principales

#### Variables Numéricas:
- `Valor FOB (USD)` - Valor de la exportación
- `Peso en kilos netos` - Peso neto del producto
- `Peso en kilos brutos` - Peso bruto incluyendo embalaje
- `Cantidad(es)` - Cantidad de unidades
- `Número de artículos` - Número de artículos en la exportación
- `Precio Unitario FOB (USD) Peso Neto` - Precio por unidad de peso

#### Variables Categóricas:
- `País de Destino` - País al que se exporta
- `Continente Destino` - Continente de destino
- `Departamento Origen` - Departamento colombiano de origen
- `Vía de transporte` - Medio de transporte utilizado
- `Moneda de negociación` - Moneda utilizada
- `Forma de pago` - Método de pago

---

## 🤖 Modelos de Machine Learning

### 1. Regresión Lineal (Supervisado - Regresión)

**Objetivo**: Predecir el Valor FOB (USD) de las exportaciones

**Variables:**
- **Dependiente**: Valor FOB (USD)
- **Independientes**: Peso, cantidad, precio unitario, país, departamento, etc.

**Métricas de Evaluación:**
- R² Score
- RMSE (Root Mean Squared Error)
- MAE (Mean Absolute Error)
- MAPE (Mean Absolute Percentage Error)

**Archivo**: `02_Regresion_Lineal.ipynb`, `model_regresion_lineal.pkl`

---

### 2. Regresión Logística (Supervisado - Clasificación)

**Objetivo**: Clasificar exportaciones en categorías de valor (Bajo/Medio/Alto/Muy Alto)

**Variables:**
- **Dependiente**: Categoria_Valor (4 clases)
- **Independientes**: Variables numéricas y codificadas

**Métricas de Evaluación:**
- Accuracy (Precisión)
- Precision
- Recall
- F1-Score
- Matriz de Confusión

**Archivo**: `03_Regresion_Logistica.ipynb`, `model_regresion_logistica.pkl`

---

### 3. K-Nearest Neighbors (KNN) (Supervisado - Clasificación)

**Objetivo**: Clasificar exportaciones basándose en vecinos más cercanos

**Parámetros:**
- n_neighbors = 5
- weights = 'distance'
- metric = 'euclidean'

**Características:**
- ✅ No asume distribución de datos
- ✅ Adapta a datos no lineales
- ⚠️ Computacionalmente costoso
- ⚠️ Sensible a escala de features

**Archivo**: `04_KNN.ipynb`, `model_knn.pkl`

---

### 4. Support Vector Machine (SVM) (Supervisado - Clasificación)

**Objetivo**: Clasificar con márgenes de separación óptimos

**Parámetros:**
- kernel = 'rbf' (Radial Basis Function)
- C = 1.0
- gamma = 'scale'

**Características:**
- ✅ Efectivo en espacios de alta dimensión
- ✅ Robusto a outliers
- ⚠️ Requiere escalamiento de datos
- ⚠️ Lento con datasets grandes

**Archivo**: `05_SVM.ipynb`, `model_svm.pkl`

---

### 5. Árboles de Decisión (Supervisado - Clasificación)

**Objetivo**: Clasificar mediante reglas jerárquicas

**Parámetros:**
- max_depth = 10
- min_samples_split = 20
- min_samples_leaf = 10

**Características:**
- ✅ Altamente interpretable
- ✅ Maneja datos no lineales
- ✅ No requiere normalización
- ⚠️ Propenso a overfitting
- ⚠️ Inestable con pequeños cambios en datos

**Archivo**: `06_Arboles_Decision.ipynb`, `model_decision_tree.pkl`

---

### 6. Naive Bayes (Supervisado - Clasificación)

**Objetivo**: Clasificación probabilística basada en teorema de Bayes

**Tipo**: GaussianNB (asume distribución normal)

**Características:**
- ✅ Muy rápido
- ✅ Funciona bien con datos de alta dimensión
- ✅ Requiere poco entrenamiento
- ⚠️ Asume independencia entre features
- ⚠️ Sensible a distribución de datos

**Archivo**: `07_Naive_Bayes.ipynb`, `model_naive_bayes.pkl`

---

### 7. K-Means Clustering (No Supervisado)

**Objetivo**: Segmentar exportaciones en grupos similares

**Parámetros:**
- n_clusters = 4
- Método del codo para selección de k

**Métricas de Evaluación:**
- Silhouette Score (más cercano a 1 = mejor)
- Davies-Bouldin Index (más cercano a 0 = mejor)
- Inercia (suma de distancias al centroide)

**Características:**
- ✅ Descubre patrones ocultos
- ✅ No requiere etiquetas
- ✅ Escalable
- ⚠️ Sensible a outliers
- ⚠️ Requiere definir k manualmente

**Archivo**: `08_KMeans.ipynb`, `model_kmeans.pkl`

---

## 📈 Resultados y Comparación

El notebook `09_Comparativo_Integrador.ipynb` realiza una comparación exhaustiva:

### Criterios de Evaluación

**Para Clasificación:**
1. **Accuracy** (30% peso) - Precisión general
2. **F1-Score** (25% peso) - Balance precision-recall
3. **Precision** (20% peso) - Predicciones correctas
4. **Recall** (15% peso) - Cobertura de clases
5. **CV Accuracy** (10% peso) - Estabilidad

**Para Regresión:**
1. **R² Score** - Varianza explicada
2. **RMSE** - Error cuadrático medio
3. **MAE** - Error absoluto medio

### Visualizaciones Incluidas

- 📊 Gráficos de barras comparativos
- 🎯 Radar charts multidimensionales
- 📈 Matrices de confusión
- 🔍 Análisis de overfitting
- 📉 Curvas de aprendizaje

---

## 🌐 Aplicación FullStack

### Backend (Flask)

**Archivo**: `app.py`

**Endpoints API:**

```
GET  /                           - Página principal
GET  /api/models                 - Listar modelos disponibles
POST /api/predict/classification - Predicción de clasificación
POST /api/predict/regression     - Predicción de regresión
POST /api/cluster                - Asignación de cluster
GET  /api/model_info/<name>      - Info detallada de modelo
POST /api/batch_predict          - Predicciones en lote
GET  /api/stats                  - Estadísticas del sistema
```

### Frontend (HTML/CSS/JavaScript)

**Archivo**: `templates/index.html`

**Características:**
- 🎨 Interfaz moderna y responsiva
- 📱 Compatible con móviles
- ⚡ Actualización en tiempo real
- 📊 Visualización de métricas
- 🔄 Selección dinámica de modelos
- ✨ Animaciones suaves

**Tecnologías:**
- Bootstrap 5
- jQuery
- Font Awesome
- Chart.js (opcional)

---

## 🔌 Uso de la API

### Ejemplo 1: Predicción de Clasificación

```python
import requests
import json

url = "http://localhost:5000/api/predict/classification"

data = {
    "model": "regresion_logistica",
    "features": {
        "Peso en kilos netos": 1500.5,
        "Peso en kilos brutos": 1600.2,
        "Cantidad(es)": 100,
        "Número de artículos": 50,
        "Precio Unitario FOB (USD) Peso Neto": 5.75,
        "País de Destino_encoded": 10,
        "Continente Destino_encoded": 1,
        "Departamento Origen_encoded": 3,
        "Vía de transporte_encoded": 0,
        "Ratio_Peso_Bruto_Neto": 1.066
    }
}

response = requests.post(url, json=data)
result = response.json()

print(f"Predicción: {result['prediction_label']}")
print(f"Probabilidades: {result['probabilities']}")
```

### Ejemplo 2: Predicción de Regresión

```python
url = "http://localhost:5000/api/predict/regression"

data = {
    "features": {
        "Peso en kilos netos": 2000,
        "Peso en kilos brutos": 2100,
        "Cantidad(es)": 150,
        "Número de artículos": 75,
        "Precio Unitario FOB (USD) Peso Neto": 8.50,
        # ... más features
    }
}

response = requests.post(url, json=data)
result = response.json()

print(f"Valor FOB Predicho: {result['prediction_formatted']}")
```

### Ejemplo 3: Clustering

```python
url = "http://localhost:5000/api/cluster"

data = {
    "features": {
        "Valor FOB (USD)": 50000,
        "Peso en kilos netos": 3000,
        "Cantidad(es)": 200,
        "Número de artículos": 100,
        "Precio Unitario FOB (USD) Peso Neto": 16.67
    }
}

response = requests.post(url, json=data)
result = response.json()

print(f"Cluster Asignado: {result['cluster']}")
print(f"Distancia al Centroide: {result['distance_to_centroid']}")
```

---

## 📚 Documentación Adicional

### Archivos de Documentación

1. **INSTALLATION.md** - Guía detallada de instalación
2. **API_DOCUMENTATION.md** - Referencia completa de API
3. **USER_GUIDE.md** - Manual de usuario
4. **DEVELOPER_GUIDE.md** - Guía para desarrolladores

### Notebooks con Explicaciones

Cada notebook incluye:
- 📝 Explicación teórica del algoritmo
- 🔢 Definición clara de variables
- 📊 Visualizaciones interpretativas
- 💡 Interpretación de resultados
- ✅ Conclusiones y recomendaciones

---

## 🛠️ Troubleshooting

### Problema: Error al cargar modelos

**Solución**: Asegúrate de haber ejecutado todos los notebooks para generar los archivos `.pkl`

```bash
# Ejecutar notebooks en orden
jupyter nbconvert --execute 01_EDA_ETL.ipynb
jupyter nbconvert --execute 02_Regresion_Lineal.ipynb
# ... etc
```

### Problema: Módulo no encontrado

**Solución**: Reinstalar dependencias

```bash
pip install -r requirements.txt --upgrade
```

### Problema: Puerto 5000 en uso

**Solución**: Cambiar puerto en `app.py`

```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Cambiar a 5001
```

---

## 🤝 Contribuciones

Este proyecto fue desarrollado como parte de un trabajo académico/profesional de Machine Learning.

**Autor**: [Tu Nombre]

**Fecha**: 2025

**Versión**: 1.0.0

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 📧 Contacto

Para preguntas, sugerencias o reportar problemas:

- Email: [tu-email@ejemplo.com]
- GitHub: [tu-usuario]
- LinkedIn: [tu-perfil]

---

## 🎓 Referencias

### Papers y Libros:
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). The Elements of Statistical Learning
- James, G., et al. (2013). An Introduction to Statistical Learning

### Documentación Oficial:
- [Scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Flask Documentation](https://flask.palletsprojects.com/)

### Tutoriales:
- [Machine Learning Mastery](https://machinelearningmastery.com/)
- [Towards Data Science](https://towardsdatascience.com/)

---

## ✅ Checklist de Implementación

- [x] EDA y ETL completo
- [x] 7 modelos de ML implementados
- [x] Notebook comparativo
- [x] Aplicación FullStack funcional
- [x] API REST documentada
- [x] Frontend interactivo
- [x] Documentación completa
- [x] Guías de instalación
- [x] Ejemplos de uso

---

**¡Gracias por usar este proyecto de Machine Learning! 🚀📊🤖**
