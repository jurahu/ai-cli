# AI CLI

This tool provides AI capabilities directly in your command line, translating natural language requests into shell commands.

## Installation

1.  **Clone the repository:**
    ```bash
    # Replace <repository_url> with the actual URL
    git clone <repository_url> ~/.ai_cli 
    cd ~/.ai_cli
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure:**
    *   **API Key:** Place your OpenAI-compatible API key in a file named `token` inside the installation directory:
        ```bash
        echo "YOUR_API_KEY_HERE" > ~/.ai_cli/token
        ```
        *Note: The script currently points to a custom endpoint (`https://litellm.in.customink.com/`).*
    *   **System Prompt:** The behavior of the AI is defined by the system prompt in `~/.ai_cli/prompt`. You can modify this file to change how it responds.

4.  **Update `.zshrc`:**
    Add the contents of `.zshrc_ai` to your `~/.zshrc` file. A simple way is:
    ```bash
    cat ~/.ai_cli/.zshrc_ai >> ~/.zshrc
    # if you want to use litellm proxy or ollama or some other compatible endpoint
    echo 'AI_CLI_LLM_UR="https://litellm.in.example.com/"' >> ~/.zshrc
    ```
    Then, reload your shell configuration:
    ```bash
    source ~/.zshrc
    ```
    This sets up:
    *   An alias: `ai` executes the script (`node ~/.ai_cli/ai.js`).
    *   A keybinding: `Ctrl+T` inserts the last generated command into your current command line.
    *   An alias: `aie` executes the last generated command directly.

## Usage

1.  **Generate a command:**
    ```bash
    $ ai 'git add only files that I modified last hour'
    find . -type f -mmin -60 -exec git add {} +
    ```
    The command will be printed to the console and saved to `~/.ai_cli/tmp.result.sh`.

    Ctrl + t will add the command to the prompt.

2.  **Insert the command:**
    Press `Ctrl+T` to insert the generated command from `~/.ai_cli/tmp.result.sh` into your current Zsh prompt.

3.  **Execute the command:**
    Type `aie` to directly execute the command saved in `~/.ai_cli/tmp.result.sh`.
