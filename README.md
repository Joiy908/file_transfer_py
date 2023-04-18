# File Transfer

This project is a web-based file transfer application that allows users to upload and download files as well as share text messages with others. It is built using Flask as the server and Vue as the frontend framework. The AJAX requests are made using Axios.

## Features

- Upload and download files
- Share text messages
- Simple and intuitive user interface
- Fast and responsive

## Technologies Used

- Flask/Express: server-side framework
- Vue: frontend framework
- Axios: AJAX requests

## Installation



1. Clone the repository:

   ```bash
   git clone git@github.com:Joiy908/file_transfer_py.git
   ```

2. Install dependencies:

   ```bash
   # create and activate vritural env here if you like to
   pip install flask
   ```

3. Run the server:

   ```bash
   flask run --host=0.0.0.0 --port=8080
   ```

4. Open the `your-local-ip:8080` (replace thiwith your own ip show in the terminal like`192.168.0.123:8080`) in your web browser and other brosers in the same WLAN.

## Usage

Firstly run the server.

### Uploading a File

To upload a file:

1. Click the "Upload" button.
2. Select the file you want to upload.
3. Click "Upload".

### Downloading a File

To download a file:

1. Click the "Download" button next to the file you want to download.

### Sharing a Text Message

To share a text message:

1. Type your message in the text box.
2. Click the "Share" button.

## License

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.
