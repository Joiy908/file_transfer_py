import os

from flask import Flask, send_from_directory, abort, Response, request

app = Flask(__name__)

ROOT_PATH = './files'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp4'}
app.config['UPLOAD_FOLDER'] = ROOT_PATH


@app.route('/')
def index():
    # get file list or ROOT_PATH
    file_list = ['<li>'+f+'</li>' for f in os.listdir(ROOT_PATH) if os.path.isfile(os.path.join(ROOT_PATH, f))]
    page_content = f"Current dir: {ROOT_PATH} </br>" \
                   "Files can be downloaded: </br>" \
                   f"<ul>{''.join(file_list)}</ul>" \
                   r"<div>How to download file: current_url/download/&#60;file_name></div>" \
                   "<div><a href='/upload'>upload file</a></div>"
    return page_content


@app.route('/download/<filename>')
def download(filename):
    if os.path.isfile(os.path.join(ROOT_PATH, filename)):
        return send_from_directory(ROOT_PATH, filename, as_attachment=True)
    else:
        abort(Response("File does not exists, please check the file name."))


# upload page
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'GET':
        return read_file("./pages/upload.html")
    else:
        if 'file' not in request.files:
            # flash('No file part')
            return 'No file part'
        f = request.files.get('file')
        if is_allowed_file(f.filename):
            f.save(os.path.join(ROOT_PATH, f.filename))  # 保存文件
            return "upload successfully!"
        else:
            return f"upload fails, file type of {f.filename} is not permitted."


def read_file(file_path):
    if not os.path.exists(file_path):
        raise Exception("File does not exit.")
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    return content


def is_allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=80,
        debug=True
    )
