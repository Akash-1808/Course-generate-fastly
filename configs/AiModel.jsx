const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
  export  const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a Course Tutorial on the Following details With the field as Course name, Description, Along with Chapter name, about, Duration : Category: 'Programming', Topic: 'Python', Level: Basic, Duration: 1 hours, No of chapters: 5 in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseName\": \"Python Fundamentals for Beginners\",\n  \"description\": \"This course provides a foundational understanding of Python programming, suitable for individuals with no prior programming experience. You'll learn the core concepts of Python, enabling you to write basic scripts and understand more advanced topics in the future.\",\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"numberOfChapters\": 5,\n  \"chapters\": [\n    {\n      \"chapterName\": \"Chapter 1: Introduction to Python and Setup\",\n      \"about\": \"This chapter introduces you to the Python programming language, its uses, and why it's popular. You'll learn how to set up your Python development environment, install Python, and choose a suitable text editor or IDE.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 2: Variables, Data Types, and Operators\",\n      \"about\": \"This chapter covers the fundamental building blocks of Python: variables, data types (like integers, floats, strings, and booleans), and operators (arithmetic, comparison, and logical). You'll learn how to declare variables, store values, and perform basic operations.\",\n       \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 3: Control Flow Statements\",\n      \"about\": \"This chapter explores control flow, enabling you to make decisions and repeat actions in your code. You'll learn about conditional statements (if, elif, else) and loops (for and while loops) and how they control the execution of your program.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 4: Introduction to Strings and Lists\",\n      \"about\": \"This chapter focuses on working with two essential data structures in Python: strings and lists. You'll learn about string manipulation, creating and accessing lists, and basic list operations.\",\n     \"duration\": \"10 minutes\"\n    },\n     {\n      \"chapterName\": \"Chapter 5: Writing Your First Python Script\",\n      \"about\": \"In this final chapter, you'll put your learning to practice by building a simple Python script that incorporates the concepts covered in previous chapters. This hands-on experience will solidify your understanding and get you started with writing Python code.\",\n       \"duration\": \"15 minutes\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
   
  
 