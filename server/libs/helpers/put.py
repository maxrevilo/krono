from re import search, compile
import urllib


def PUT(request, value):
    p = compile('%s=([^&]*)' % value)
    result = search(p, request.body)
    if result:
        return urllib.unquote_plus(result.group(1))
    else:
        return None


def PUT_dict(request, keys):
    """
    Dado una lista de claves, devuelve un diccionario con los correspondientes
    valores, extraidos de la data cruda del request
    """
    dictionary = {}
    for key in keys:
        dictionary.update({key: PUT(request, key)})
    return dictionary
