const inquirer = require('inquirer');
const fs = require('fs');

// Function to generate SVG content
const generateSVG = (shape, color, text) => {
  let svgContent = '';

  if (shape === 'Circle') {
    svgContent = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="${color}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20">${text}</text>
      </svg>
    `;
  } else if (shape === 'Square') {
    svgContent = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="${color}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20">${text}</text>
      </svg>
    `;
  } else if (shape === 'Triangle') {
    svgContent = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,15 100,100 0,100" fill="${color}" />
        <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20">${text}</text>
      </svg>
    `;
  }

  return svgContent;
};

// Function to prompt user for input
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'shape',
      message: 'Select the shape of the logo:',
      choices: ['Circle', 'Square', 'Triangle'],
    },
    {
      type: 'input',
      name: 'color',
      message: 'Enter the color for the logo (e.g., red, #00ff00):',
      validate: (input) => !!input || 'Color is required',
    },
    {
      type: 'input',
      name: 'text',
      message: 'Enter the text for the logo:',
      validate: (input) => !!input || 'Text is required',
    },
    {
      type: 'input',
      name: 'filename',
      message: 'Enter the filename to save the SVG (without extension):',
      validate: (input) => !!input || 'Filename is required',
    },
  ]);
};

// Main function to run the application
const run = async () => {
  try {
    const answers = await promptUser();
    const { shape, color, text, filename } = answers;
    const svgContent = generateSVG(shape, color, text);
    fs.writeFileSync(`${filename}.svg`, svgContent.trim());
    console.log(`SVG logo saved as ${filename}.svg`);
  } catch (error) {
    console.error('Error generating SVG logo:', error);
  }
};

// Execute the main function
run();
