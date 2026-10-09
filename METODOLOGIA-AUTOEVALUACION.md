# Mapa de bienestar actual — nota metodológica v1.0

## Objetivo

Herramienta pública de **orientación y navegación**, no de diagnóstico.

Busca resolver una pregunta simple del visitante:

> "Sé que algo me está pasando, pero no sé bien por dónde empezar."

El resultado intenta ordenar señales en áreas amplias y ofrecer contenido pertinente de la web.

## Naturaleza de los ítems

Los ítems son **preguntas propias**, redactadas para esta experiencia web.

No se presentan como:
- instrumento psicométrico validado;
- escala diagnóstica;
- prueba estandarizada;
- sustituto de BDI, BAI, PHQ, GAD u otros instrumentos;
- estimación de prevalencia o probabilidad de diagnóstico.

Por este motivo la interfaz utiliza expresiones como:
- pocas señales;
- algunas señales;
- varias señales;
- señales muy presentes.

No utiliza:
- "leve/moderado/severo" como categoría clínica;
- porcentajes de ansiedad/depresión;
- puntos de corte diagnósticos.

## Ventana temporal

Las preguntas piden pensar en **las últimas dos semanas** para dar un marco temporal común.

Esto no convierte al instrumento en una escala validada ni le transfiere propiedades psicométricas de otras escalas.

## Respuestas

Para los ítems de frecuencia:

- 0 = Nunca o casi nunca
- 1 = Algunos días
- 2 = Bastante seguido
- 3 = Casi todos los días

La primera pregunta de contexto solamente decide si se muestran preguntas laborales adicionales.

## Dominios internos

### Preocupación y activación
Se nutre de señales como:
- preocupación persistente;
- tensión/alerta;
- dificultad para relajarse;
- sueño afectado;
- evitación laboral cuando corresponda.

### Energía y estado de ánimo
Se nutre de:
- pérdida de interés;
- baja energía;
- menor motivación;
- concentración;
- recuperación.

### Sobrecarga y recuperación
Se nutre de:
- demandas percibidas > recursos;
- dificultad para recuperar energía;
- dificultad para desconectar;
- impacto en descanso;
- rumiación laboral cuando corresponda.

### Contexto laboral o interpersonal adverso
Sólo aparece si el usuario indicó que el trabajo/estudio/organización es relevante.

Incluye:
- dificultad para desconectar del trabajo;
- interacciones hostiles/descalificadoras/aislantes;
- evitación por tensión o anticipación.

**Nunca se interpreta automáticamente como acoso laboral.**
El resultado explica expresamente que evaluar acoso exige contexto, repetición, duración, relaciones de poder, conductas concretas e hipótesis alternativas.

### Interferencia
Se calcula separadamente como modificador de relevancia:
- sueño/descanso;
- concentración/decisiones;
- interferencia cotidiana.

No compite para ser "área principal".

## Regla de resultado

Cada dominio obtiene un promedio simple de sus ítems disponibles.

Rangos internos de presentación:

- < 0.75 → Pocas señales
- 0.75 a < 1.50 → Algunas señales
- 1.50 a < 2.25 → Varias señales
- >= 2.25 → Señales muy presentes

Estos rangos **no son baremos** y no tienen interpretación clínica independiente.

El área principal es el dominio con promedio más alto.

Si:
- todos los dominios están por debajo de 0.75 → "Sin predominio claro";
- la diferencia entre los dos dominios más altos es menor a 0.25 → perfil "mixto".

## Principio de IA

La v1.0 no utiliza IA.

Flujo:

`respuestas → reglas determinísticas locales → resultado → contenido sugerido`

Si en una fase futura se agrega IA, sólo podrá redactar o explicar el resultado objetivo; no modificará el scoring.

## Privacidad

Por defecto:
- no solicita nombre;
- no solicita DNI;
- no solicita teléfono;
- no solicita motivo de consulta libre;
- no envía respuestas al servidor;
- no crea expediente;
- no almacena scoring en una base de datos.

El cálculo se realiza en el navegador.

El email es opcional y posterior al resultado.
Cuando se solicita, el navegador envía al backend:
- dirección de email;
- identificador técnico del resultado;
- PDF ya generado.

No se envían los puntajes como campos estructurados separados.

## Riesgo / urgencias

Esta herramienta **no contiene un ítem de suicidio o autolesión** y no debe utilizarse para triage de riesgo.

La página incluye una advertencia general de que no funciona como recurso de urgencias.

Si en el futuro se incorpora detección de riesgo, deberá diseñarse un flujo específico, con revisión clínica, legal, operativa y de responsabilidad profesional.

## Estrategia de producto

La función principal no es "medir por medir", sino orientar navegación:

- Activación → contenido de ansiedad.
- Ánimo → estado de ánimo.
- Sobrecarga → burnout.
- Contexto laboral → acoso/violencia laboral + recursos.
- Impacto alto → sugerir evaluación profesional.

Esto convierte la autoevaluación en una puerta de entrada al ecosistema sin confundir marketing con diagnóstico.
