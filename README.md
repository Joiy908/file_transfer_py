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
   python3 run [-enable_del]
   ```

   - `-enable_del` give the user perssion to delete file. by default users are not allow to delete files.

4. Open the `your-local-ip:8080` (replace this with your own ip show in the terminal like`192.168.0.123:8080`) in your web browser and other browsers in the same WLAN.

PS: If the err `err: fail to get ip address` show, change the `get_ipv4()` function in app.py to fit your environment.

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

### Delete a file

By default, this feature is turned off.

`python app.py -enable_del` to enable the feature.

### Sharing a Text Message

To share a text message:

1. Type your message in the text box.
2. Click the "Share" button.

## run.sh

```bash
# Parse command-line arguments
while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
        -del|--enable-delete)
        ENABLE_DEL="-enable_del"
        shift
        ;;
        *)
        # Unknown option
        echo "Unknown option: $key"
        exit 1
        ;;
    esac
done

# Activate the virtual environment
source /d/src/Py_projects/projects_2022/file_transfer/flaskVenv/Scripts/activate

# Change to the project directory and run the Flask app with optional flag
cd /d/src/Py_projects/projects_2022/file_transfer/
python app.py $ENABLE_DEL

#cd /d/src/etc/file_transfer_js
#npm run serve
```



## License

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.
