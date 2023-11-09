import os

from collections import OrderedDict
from flask import Flask, send_from_directory, abort, request, jsonify
from markupsafe import escape
import re

app = Flask(__name__)

ROOT_PATH = './files'
# not contain `..` and start with ROOT_PATH 
path_pat = re.compile(r'^(?!.*\.\.)^' + ROOT_PATH)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp4', 'zip'}
app.config['UPLOAD_FOLDER'] = ROOT_PATH

FILE_TYPE_CHECK = False

messages = ['demo message']

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
    '''return path tree'''
    path_name = request.args.get('dirPath')

    if not is_valid_dir_path(path_name):
        return abort(400, "invalid dirPath")

    currentDirName, subFolderList, subFileList = list(os.walk(path_name))[0]
    path_tree = {'currentDirName': currentDirName,
                'subFolderList': subFolderList,
                'subFileList': subFileList}
    return path_tree


@app.route('/download', methods=['GET'])
def download():
    file_path = request.args.get('filePath')
    if is_valid_file_path(file_path):
        # get file_path_without_root
        file_path_without_root = file_path.replace(ROOT_PATH + '/', '')
        return send_from_directory(ROOT_PATH, file_path_without_root, as_attachment=True)
    else:
        abort(400, 'invalid filePath.')


@app.route('/delete', methods=['POST'])
def delete():
    if args.enable_del:
        file_path = request.args.get('filePath')
        if is_valid_file_path(file_path):
            os.remove(file_path)
            return f"delete {escape(file_path)} ok!"
        else:
            abort(400, 'invalid filePath.')
    else:
        return abort(400, 'The delete feature is disabled.')


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
        if not is_valid_dir_path(dir_path):
            return abort(400, \
                "upload fails, {dir_path} is invalid.'")
        f.save(os.path.join(dir_path, f.filename))  # 保存文件
        return 'upload successfully!'


@app.route('/messages', methods=['GET', 'POST'])
def getMsgs():
    if request.method == 'POST':
        # add msg to Global
        msg = request.get_json().get('msg')
        if msg is None:
            return abort(400, "msg need to be provided")
        messages.append(msg)
        return "upload msg successfully."
    else:
        # if request type is GET, return messages
        return {'messages': list(messages)}


def is_valid_dir_path(path: str):
    return path is not None and path_pat.match(path) and os.path.isdir(path);

def is_valid_file_path(path: str):
    return path is not None and path_pat.match(path) and os.path.isfile(path);

def is_allowed_file(filename: str):
    if not FILE_TYPE_CHECK:
        return True
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def red(text: str):
    return '\x1b[31m' + text + '\x1b[0m'

def get_ipv4():
    import os, re
    ip_info: str = os.popen('ipconfig').read()
    wlan_ipv4_pattern = r'WLAN.*?IPv4.*?(\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})'

    match = re.search(wlan_ipv4_pattern, ip_info, re.DOTALL)
    if not match or match.lastindex != 1:
        import sys
        sys.exit(red('err: fail to get ip address'))
    print('successfully get ip: %s' % match.group(1))
    return match.group(1)


if __name__ == '__main__':
    import argparse
    global args
    parser = argparse.ArgumentParser(description='Flask Application')
    parser.add_argument('-enable_del', action='store_true', help='Enable the /delete endpoint')
    args = parser.parse_args()

    if args.enable_del:
        print(red('### delete is enabled'))

    app.run(
        host=get_ipv4(),
        port=8080,
        debug=False
    )
