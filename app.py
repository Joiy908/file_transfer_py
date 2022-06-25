import os

from flask import Flask, send_from_directory, abort, Response

app = Flask(__name__)

ROOT_PATH = './files'


@app.route('/')
def index():
    # get file list or ROOT_PATH
    file_list = [f for f in os.listdir(ROOT_PATH) if os.path.isfile(os.path.join(ROOT_PATH, f))]
    page_content = f"Current dir: {ROOT_PATH} </br>" \
                   "Files can be downloaded: </br>" \
                   f"{str(file_list)}</br>" \
                   r"<div>How to download file: current_url/download/&#60;file_name></div>"
    return page_content


@app.route('/download/<filename>')
def download(filename):
    if os.path.isfile(os.path.join(ROOT_PATH, filename)):
        return send_from_directory(ROOT_PATH, filename, as_attachment=True)
    else:
        abort(Response("File does not exists, please check the file name."))


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=80,
        debug=True
    )
