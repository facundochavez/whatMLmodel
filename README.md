# whatMLmodel

*whatMLmodel* is a web application designed to help data scientists and machine learning developers explore and experiment with machine learning models. It provides an easy way to analyze datasets and get recommendations for appropriate models based on your input. Whether you're studying machine learning or exploring new models, *whatMLmodel* offers a dashboard to document and analyze problems effectively.

![wMLm capture](https://github.com/user-attachments/assets/95484d21-3e30-47a2-b7f5-9f8938feb26d)

## Technologies Used

- *Next.js*: A React framework for building server-side rendered applications.
- *ShadCn*: A UI component library built on top of Radix UI for creating accessible and customizable components.
- *Gemini*: Used for integrating generative AI functionalities.
- *Prisma ORM*: Auto-generated and type-safe database client.
- *PostgreSQL*: Object-relational database.

## Contribution Guide

We welcome contributions to *whatMLmodel*! To contribute, please follow these steps:

1. *Fork the Repository*: Create a personal copy of the repository by forking it on GitHub.
2. *Clone the Repository*: Clone your forked repository to your local machine.

    ```bash
    git clone <https://github.com/your-username/whatMLmodel.git>
    ```

3. *Install Dependencies*: Navigate to the project directory and install the required dependencies.

    ```bash
    cd whatMLmodel
    npm install
    ```

4. *Create a .env File*: Create a .env file in the root directory and add the following information:

    GOOGLE_API_KEY=Your_Google_API_Key

    You can obtain this API key from [Gemini](https://aistudio.google.com).
5. *Code Standards*: Follow the coding standards inherited from ShadCn. Ensure your code adheres to these guidelines.
6. *Commit Messages*: Use clear and descriptive commit messages. Follow the conventional commit style where applicable.
7. *Pull Requests*: When submitting a pull request, ensure that your code is well-tested and follows the project's contribution guidelines. Describe your changes in detail in the PR description.

## Installation and Setup

To run *whatMLmodel* locally, follow these steps:

1. *Clone the Repository*:

    ```bash
    git clone <https://github.com/your-username/whatMLmodel.git>
    ```

2. *Navigate to the Project Directory*:

    ```bash
    cd whatMLmodel
    ```

3. *Install Dependencies*:

    ```bash
    npm install
    ```

4. *Create a .env File*: Add your Google API key in a .env file in the root directory:

    GOOGLE_API_KEY=Your_Google_API_Key

5. *Run the Application*:

    ```bash
    npm run dev
    ```

    Visit <http://localhost:3000/> in your browser to see the application running.

## Usage

Once the application is running, you can start by providing a simple description of your dataset and target value. The application will generate detailed fields and provide recommendations for machine learning models that best fit your problem.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Additional Information

- For more information on contributing and project updates, please refer to the [GitHub repository](https://github.com/your-username/whatMLmodel).
- If you encounter issues or have questions, open an issue on the GitHub repository or submit a pull request with your improvements.

Thank you for contributing to *whatMLmodel*!
