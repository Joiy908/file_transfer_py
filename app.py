import os

from flask import Flask, send_from_directory, abort, Response, request

app = Flask(__name__)

ROOT_PATH = './files'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp4', 'zip'}
app.config['UPLOAD_FOLDER'] = ROOT_PATH

messages = ['demo message']


@app.route('/')
def index():
    return read_file('pages/index.html')


@app.route('/path', methods=['POST'])
def getPathTree():
    path_name = request.get_json().get('dirPath')
    if not os.path.exists(path_name):
        path_name = ROOT_PATH
    (currentDirName, subFolderList, subFileList) = list(os.walk(path_name))[0]
    pathTree = {'currentDirName': currentDirName,
                'subFolderList': subFolderList,
                'subFileList': subFileList}
    return pathTree


@app.route('/download')
def download():
    file_path = request.args.get('filePath')
    if os.path.isfile(file_path):
        # get file_path_without_root
        file_path_without_root = file_path.replace(ROOT_PATH + '/', '')
        return send_from_directory(ROOT_PATH, file_path_without_root, as_attachment=True)
    else:
        abort(Response('File does not exists, please check the file name.'))


# upload page
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'GET':
        return read_file('./pages/upload.html')
    else:
        if 'file' not in request.files:
            # flash('No file part')
            return 'No file part'
        f = request.files.get('file')
        # get file path from URL param
        dir_path = request.args.get('dirPath')
        if not is_allowed_file(f.filename):
            return f'upload fails, file type of {f.filename} is not permitted.'
        if not os.path.exists(dir_path):
            return f"upload fails, {dir_path} don't exist.'"
        f.save(os.path.join(dir_path, f.filename))  # 保存文件
        return 'upload successfully!'


@app.route('/messages', methods=['GET', 'POST'])
def getMsgs():
    if request.method == 'POST':
        # add msg to Global
        msg = request.get_json().get('msg')
        messages.append(msg)
        return "upload msg successfully."
    else:
        # if request type is GET, return messages
        return {'messages': messages}


def read_file(file_path):
    if not os.path.exists(file_path):
        raise Exception('File does not exit.')
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    return content


def decode_path(file_path):
    """rule: replace '-p*a*t*h-' with '/' """
    return file_path.replace('-p*a*t*h-', '/')


def is_allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=80,
        debug=True
    )
