String.prototype.format = function () {
    var literal = this;

    for (var i = 0; i < arguments.length; i++) {
        var regex = new RegExp('\\{' + i + '\\}', 'g');
        literal = literal.replace(regex, arguments[i]);
    }

    return literal;
};

//accounting.settings = {
//    currency: {
//        symbol: "Bs.F", // default currency symbol is '$'
//        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
//        decimal: ",", // decimal point separator
//        thousand: ".", // thousands separator
//        precision: 2   // decimal places
//    },
//    number: {
//        precision: 2, // default precision on numbers is 0
//        thousand: ".",
//        decimal: ","
//    }
//};
var EddieLogin = function ($http, $scope){
  var promise;
  
  this.service = function (){
    promise = $http.get(url+URL.LOGIN,{
       headers: getHeader(true) 
    }).then( function (response){
        $scope.respuesta = response.data;
    });
    
  };
    
    
    
};
var getStore = function ($http, path, project, authenticate) {
    var promise;
   // $.mobile.showPageLoadingMsg();
    this.service = function () {
        if (!promise) {
            promise = $http.get((!project ? url : project) + path, {
                headers: getHeader(authenticate)
            }).error(function (data, status, headers, config) {
                switch (status) {
                    case 401, 404:
                        alert(data);
                        break;
                    case 403:
                        switch (data) {
                            case 'Session expired!.':
                                alert("Su sesión ha caducado");
                                break;
                            case 'Session id not found':
                                alert("Su sesión ha caducado");
                                break;
                            case 'Security-risk-info':
                                alert("Intenta acceder a un recurso no autorizado.");
                                break;
                            case 'Authenticate information invalid.':
                                alert("Su usuario o contraseña son invalidos.")
                                break;
                            default :
                                alert("Acceso denegado.");
                                break;
                        }
                        break;
                    case 500:
                        alert("Ha ocurrido un error inesperado en el servidor. Intente mas tarde.");
                        break;
                    default : 
                        console.log("Status response: {0} -\n Message Response: {1}" +
                                " - ".
                                format(status, data));
                        break;
                }
            }).then(function (response, status, headers, config) {
                //$.mobile.hidePageLoadingMsg();
                
                   console.log(JSON.stringify(headers))
                if (response.data.length == 0)
                    alert("No se consiguieron registro \n para visualizar");
                return response.data;
            });
        }
        return promise;
    };
};

var NOTE = 20;

function viewScore(d, div) {
    var scores = [];
    var subject = '';
    var subjectInner;

    angular.forEach(d, function (value, key) {
        if (subject != value.section.subject.name) {
            subjectInner = new Array();
            this.push(subjectInner);
        }
        subjectInner.push(value);
        subject = value.section.subject.name;
    }, scores);

    var ul = getUlFilter();

    var accumulateNote = 0;
    var acumulativePercentage = 0;
    angular.forEach(scores, function (value, key) {
        accumulateNote = 0;
        acumulativePercentage = 0;

        var li = getLiDivider(value[0].section.subject.name + '. Sección: ' + value[0].section.name);
        ul.append(li);

        angular.forEach(value, function (a, b) {
            acumulativePercentage += parseFloat(a.weight);
            var percentNote = a.accumulatedScore;
            //(parseFloat(a.scoreValue) * parseFloat(a.weight)) / 100;
            accumulateNote += parseFloat(percentNote);

            var params = a.order + '/' + a.weight + '/' + a.date + '/' +
                    a.strategy + '/' + a.scoreValue + '/' + percentNote + '/' +
                    acumulativePercentage + '/' + accumulateNote + '/' +
                    a.section.subject.name + " - " + a.section.name + '/' +
                    a.section.subject.code + '/' + a.section.professor.fullName + '/' +
                    a.section.professor.identification;

            var li = $('<li>');
            var link = $('<a>', {
                href: 'viewScoreDetail/' + params
            });

            var content = '<p>' + a.order + " .- Porcentaje: " + a.weight + '%.';
            content += "<br>Nota: " + a.scoreValue + ' / ' + NOTE + '</p>';

            var sSubjectSection = getSpan(undefined, a.section.subject.name +
                    ' ' + a.section.name);
            sSubjectSection.attr({
                style: 'display:none'
            });
            link.append(content);
            link.append(sSubjectSection);
            li.append(link);
            ul.append(li);
        });
        li.append(getSpanCount(accounting.formatNumber(accumulateNote)));
    });
    $('#' + div).html(ul);
    ul.listview();
}

function getPeriod(PeriodService, inscription, $scope, callback) {
    var result = PeriodService.findByInscription(inscription.id);
    result.service().then(function (period) {
        $scope.periods = period;
        if (callback != undefined)
            callback();
    });
    $scope.showPeriod = true;

}

function getStudyType(type) {
    switch (type) {
        case 'PREGRADO':
            return 1;
        case 'POSTGRADO':
            return 2;
        case 'EXTENSION':
            return 3;

        case 1:
            return 'PREGRADO';
        case 2:
            return 'POSTGRADO';
        case 3:
            return "EXTENSION";
    }
}

function spanishDate(d) {
    var weekday = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    var monthname = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return weekday[d.getDay()] + " " + d.getDate() + " de " + monthname[d.getMonth()] + " de " + d.getFullYear();
}

//function alert(message) {
//    $.mobile.showPageLoadingMsg("a", message, true);
//    timeOut(function () {
//        $.mobile.hidePageLoadingMsg();
//    }, 3000);
//}

function fncFormatoNumero(numero, decimales, separadorDecimal, separadorMiles) {

    numero = parseFloat(numero);

    if (isNaN(numero)) {
        return "";
    }

    if (decimales !== undefined) {
        // Redondeamos
        numero = numero.toFixed(decimales);
    }

    // Convertimos el punto en separadorDecimal
    numero = numero.toString().replace(".", separadorDecimal !== undefined ? separadorDecimal : ",");

    if (separadorMiles) {
        // Añadimos los separadores de miles
        var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
        while (miles.test(numero)) {
            numero = numero.replace(miles, "$1" + separadorMiles + "$2");
        }
    }

    return numero;
}
;

function getHeader(authenticate) {
    if (authenticate){
                return {'X-Authenticate': Security.user + ':' + Security.password};

    } else
        return {'X-Authorization': Security.token,
                    };
}

function profile() {
    $('#profile').panel('open');
}

Function.prototype.bind = function (scope) {
    var _function = this;

    return function () {
        return _function.apply(scope, arguments);
    };
};

function getLiP(li, description, value) {
    var p = $('<p>');
    p.append($('<strong>').html(description));
    p.append(value);
    li.append(p);
    return li;
}

function getUl() {
    var ul = $('<ul>');
    ul.attr({
        'data-role': 'listview',
        'data-inset': true
    });
    return ul;
}

function getLiDivider(text) {
    var li = $('<li>');
    li.attr({
        'data-role': 'list-divider'
    });
    li.text(text);
    return li;
}

function getSpanCount(text) {
    var sCount = $('<span>', {
        class: 'ui-li-count'
    });
    sCount.text(text);
    return sCount;
}

function getSpan(id, text) {
    var span = $('<span>', {
        id: id
    });
    span.text(text);
    return span;
}

function getH2(text) {
    var h2 = $('<h2>', {
        text: text
    });
    return h2;
}

function getUlFilter() {
    var ul = getUl();
    ul.attr({
        'data-filter-placeholder': "Buscar...",
        'data-filter': true
    });
    return ul;
}

function romanize(num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman = "",
            i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function deromanize(str) {
    var str = str.toUpperCase(),
            validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
            token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
            key = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1},
    num = 0, m;
    if (!(str && validator.test(str)))
        return false;
    while (m = token.exec(str))
        num += key[m[0]];
    return num;
}

function matchPassword(text) {
    var re = new RegExp("((?=.*\\d)(?=.*[a-zA-z])(?=.*[\\.@#$&%\\-\\*/_]).{6,25})");
    return text.match(re);
}

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len)
                    val = "0" + val;
                return val;
            };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date))
            throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};