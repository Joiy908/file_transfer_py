import os

from flask import Flask, send_from_directory, abort, Response, request, jsonify, escape
from collections import OrderedDict
import argparse

app = Flask(__name__)

ROOT_PATH = './files'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp4', 'zip'}
app.config['UPLOAD_FOLDER'] = ROOT_PATH

FILE_TYPE_CHECK = False

messages = {'demo message'}

@app.errorhandler(400)
def bad_request(e):
    return jsonify(OrderedDict({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })), 400

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')


@app.route('/path', methods=['GET'])
def getPathTree():
    path_name = request.args.get('dirPath')
    if path_name is None or not os.path.exists(path_name):
        return abort(400, "invalid dirPath")
    (currentDirName, subFolderList, subFileList) = list(os.walk(path_name))[0]
    path_tree = {'currentDirName': currentDirName,
                'subFolderList': subFolderList,
                'subFileList': subFileList}
    return path_tree


@app.route('/download', methods=['GET'])
def download():
    file_path = request.args.get('filePath')
    if file_path is not None and os.path.isfile(file_path):
        # get file_path_without_root
        file_path_without_root = file_path.replace(ROOT_PATH + '/', '')
        return send_from_directory(ROOT_PATH, file_path_without_root, as_attachment=True)
    else:
        abort(400, 'invalid filePath.')


@app.route('/delete', methods=['POST'])
def delete():
    if args.enable_del:
        file_path = request.args.get('filePath')
        if file_path is not None and os.path.isfile(file_path):
            os.remove(file_path)
            return f"delete {escape(file_path)} ok!"
        else:
            abort(400, 'invalid filePath.')
    else:
        return abort(400, 'The delete feature is disabled.')


# upload page
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'GET':
        return send_from_directory('pages', 'upload.html')
    else:
        if 'file' not in request.files:
            # flash('No file part')
            return abort(400, "no file part")
        f = request.files.get('file')
        # get file path from URL param
        dir_path = request.args.get('dirPath')
        if not is_allowed_file(f.filename):
            return abort(400, \
                'upload fails, file type of {f.filename} is not permitted.')
        if not os.path.exists(dir_path):
            return abort(400, \
                "upload fails, {dir_path} don't exist.'")
        f.save(os.path.join(dir_path, f.filename))  # 保存文件
        return 'upload successfully!'


@app.route('/messages', methods=['GET', 'POST'])
def getMsgs():
    if request.method == 'POST':
        # add msg to Global
        msg = request.get_json().get('msg')
        if msg is None:
            return abort(400, "msg need to be provided")
        messages.add(msg)
        return "upload msg successfully."
    else:
        # if request type is GET, return messages
        return {'messages': list(messages)}


def is_allowed_file(filename):
    if not FILE_TYPE_CHECK:
        return True
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Flask Application')
    parser.add_argument('-enable_del', action='store_true', help='Enable the /delete endpoint')
    args = parser.parse_args()

    RED = '\x1b[31m'
    RESET = '\x1b[0m'
    if args.enable_del:
        print(RED + '### delete is enabled' + RESET)
    app.run(
        host='0.0.0.0',
        port=8080,
        debug=False
    )
