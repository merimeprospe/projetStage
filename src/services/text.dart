Future<String> commander(String nom, String prenom, String mail, String tel,
      String adresse, String note) async {
    final url = Uri.https('dashboard.genuka.com', 'api/2021-05/commands');

    //final  url = Uri.http('192.168.43.253','cafe/index.php');
    Map data = {
      "client_email": mail,
      "restaurant_id": _companyId,
      //"reduction":null.toString(),
      "total": (_total + double.parse(_company.tarifLivraison))
          .toString(), // Frais de livraison
      "subtotal": _total.toString(),
      "livraison": _company.tarifLivraison.toString(), // Frais de livraison
      "shipping": {
        "state": 0.toString(),
        "date": DateTime.now().millisecondsSinceEpoch, //DateTime.now()
        "human_date": DateTime.now().millisecondsSinceEpoch,
        "address_type": 1.toString(),
        "address": adresse,
        "mode": "home delivery"
      },
      "payment": {"mode": _paiementMode, "state": 0},
      "note": note,
      "source": "",
      "produits": _commandes.map((Commande produit) {
        return {
          "id": produit.id.toString(),
          "quantity": produit.nombre.toString(),
          "price": (produit.price + produit.priceadd).toString(),
          "add_to_cart_date": produit.date,
          "properties": {"complement": produit.complement, "note": produit.note}
        };
      }).toList()
    };
    try {
      var response = await http.post(url,
          headers: {
            "Authorization": "Bearer " + this.user.code,
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          body: jsonEncode(data));
      switch (response.statusCode) {
        case 201:
          final String responsestring = response.body;
          ReponsePostCommande result = ReponsePostCommandeFromJson(responsestring);
          
          for (var i = 0; i < _commandes.length; i++) {
            
             DataBase.instance.deleteCommande(CommandeToJson(_commandes[i]));
          }
          _commandes= [];
          _total = 0;
          _commandeId = result.id.toString();
          notifyListeners();


          return _commandeId;
          break;
        case 403:
          return "";
          break;
        default:
          return "";
      }
    } catch (e) {
      print(e);
      return null;
    }
  }