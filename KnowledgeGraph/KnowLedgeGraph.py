from flask import Flask
from flask import jsonify
from flask import request
import os
import json

app = Flask(__name__)

@app.route('/data_post', methods=['GET'])
def post_data():
    Mydata = request.get_json()
    return (jsonify(Mydata))

@app.route('/data', methods=['POST'])
def get_hagong_main():
    get_data = request.form
    get_data = get_data.to_dict()

    for keys in get_data.keys():
        txt=keys
    for strr in [':','：','#','{','}','[',']','\\','/']:
        txt=txt.replace(strr,'')

    with open(r'..\hagongda\data.txt', 'w', encoding='utf-8') as f:
        for tx in txt:
            f.write(str(tx))
    os.system(r'..\hagongda\run_py36.bat')

    data = {}
    data['dataRel'] = []
    data["dataLink"]= []

    list_name=[]
    node_id = 0
    rel_temp_dict = {}

    with open(r'..\hagongda\json_data.json', 'r', encoding='utf-8') as f:
        for list in json.load(f):
            if list[0] not in list_name:
                node_temp_dict = {}
                node_temp_dict['name']=list[0]
                list_name.append(list[0])
                node_temp_dict['draggable'] = "true"
                node_temp_dict["category"] = 0
                node_temp_dict["symbolSize"] = 80
                node_temp_dict["showNum"] = 25
                node_temp_dict["value"] = 40
                node_temp_dict['number']= node_id
                data["dataRel"].append(node_temp_dict)
                node_id+=1

            if list[2] not in list_name:
                list_name.append(list[2])
                node_temp_dict = {}
                node_temp_dict['draggable'] = "true"
                node_temp_dict["category"] = 0
                node_temp_dict["symbolSize"] = 80
                node_temp_dict["showNum"] = 25
                node_temp_dict["value"] = 40
                node_temp_dict["number"] = node_id
                node_temp_dict['name'] = list[2]
                data["dataRel"].append(node_temp_dict)
                node_id += 1

            source_id=list_name.index(list[0])
            target_id=list_name.index(list[2])

            rel_temp_dict["source"]=source_id
            rel_temp_dict["target"]=target_id
            rel_temp_dict['value']=list[1]
            data['dataLink'].append(rel_temp_dict)
            rel_temp_dict={}

        with open('temp_json.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, sort_keys=True, indent=3, ensure_ascii=False)
        print(data)

    return (jsonify(data))

# 解决跨域问题用的
@app.after_request
def cors(environ):
    environ.headers['Access-Control-Allow-Origin']='*'
    environ.headers['Access-Control-Allow-Method']='*'
    environ.headers['Access-Control-Allow-Headers']='x-requested-with,content-type'
    return environ

if __name__ == '__main__':
    app.run(debug=True)
