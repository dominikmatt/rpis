var TemplateEngine = function(html, options) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}


var cpusTemplate = 
    '<%for(var index in this.cpus) {%>' + 
    '<span class="subtitle">Models:</span><span><%this.cpus[index]["model"]%></span><br />' +
    '<span class="subtitle">Speed:</span><span><%this.cpus[index]["speed"]%></span><br />' +
    '<span class="subtitle">User:</span><span><%this.cpus[index]["times"]["user"]%></span><br />' +
    '<span class="subtitle">System:</span><span><%this.cpus[index]["times"]["sys"]%></span><br />' +
    '<span class="subtitle">idle:</span><span><%this.cpus[index]["times"]["idle"]%></span><br />' +
    '<span class="subtitle">irq:</span><span><%this.cpus[index]["times"]["irq"]%></span><br />' +
    '<%}%>';
    
    
    
var ipAddressTemplate = 
	'<%for(var index in this.ipAddresses) {%>' + 
	'<%for(var subIndex in this.ipAddresses[index]) {%>' + 
    '<span class="subtitle"><%index%>:</span><span><%this.ipAddresses[index][subIndex]%> (<%subIndex%>)</span><br />' +
    '<%}%>' +
    '<%}%>';