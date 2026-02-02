# Screenshot to PDF - Chrome Extension

Une extension Chrome pour capturer automatiquement plusieurs captures d'écran et les exporter en un seul fichier PDF.

## 🚀 Fonctionnalités

- **Capture automatique** : Prenez plusieurs captures d'écran consécutives
- **Navigation automatique** : Passe automatiquement à la page suivante (touche flèche droite)
- **Export PDF** : Combine toutes les captures en un seul fichier PDF
- **Configuration flexible** : Définissez le nombre de captures et le délai entre chaque capture
- **Format optimisé** : PDF en format paysage A4

## 📦 Installation

### Installation depuis les sources

1. Clonez ce dépôt :
```bash
git clone https://github.com/Loayus/screenshot-pdf-extension.git
cd screenshot-pdf-extension
```

2. Ouvrez Chrome et allez sur `chrome://extensions/`

3. Activez le "Mode développeur" en haut à droite

4. Cliquez sur "Charger l'extension non empaquetée"

5. Sélectionnez le dossier du projet

## 💡 Utilisation

1. Cliquez sur l'icône de l'extension dans la barre d'outils Chrome

2. Configurez les paramètres :
   - **Nombre de captures** : Entre 1 et 200 captures
   - **Délai entre captures** : Temps d'attente en millisecondes (100-5000ms)

3. Cliquez sur "🚀 Démarrer"

4. L'extension va :
   - Capturer l'écran actuel
   - Appuyer sur la flèche droite pour passer à la page suivante
   - Attendre le délai spécifié
   - Répéter le processus pour le nombre de captures demandé

5. Le PDF sera automatiquement téléchargé à la fin

## 🛠️ Technologies utilisées

- **Manifest V3** : Dernière version du système d'extensions Chrome
- **jsPDF** : Génération de fichiers PDF côté client
- **Chrome APIs** :
  - `chrome.tabs.captureVisibleTab` : Capture d'écran
  - `chrome.scripting` : Injection de scripts
  - `chrome.downloads` : Téléchargement du PDF

## 📁 Structure du projet

```
screenshot-pdf-extension/
├── manifest.json          # Configuration de l'extension
├── background.js          # Service worker en arrière-plan
├── popup.html            # Interface utilisateur
├── popup.js              # Logique de l'interface
├── jspdf.umd.min.js      # Bibliothèque jsPDF
└── README.md             # Ce fichier
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

## 📝 Cas d'usage

Cette extension est particulièrement utile pour :
- Exporter des présentations Canva en PDF
- Capturer des séquences de diapositives
- Créer des documentations visuelles
- Archiver des contenus web paginés

## ⚙️ Permissions requises

- `activeTab` : Accès à l'onglet actif pour la capture
- `scripting` : Injection de scripts pour la navigation automatique
- `downloads` : Téléchargement du PDF généré
- `<all_urls>` : Fonctionne sur tous les sites web

## 🐛 Problèmes connus

- Le délai entre les captures peut nécessiter un ajustement selon la vitesse de chargement des pages
- Certains sites peuvent bloquer l'injection de scripts
- La qualité des captures dépend de la résolution de l'écran

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**Ledoux Antoine**

- GitHub: [Loayus](https://github.com/VOTRE_USERNAME)

## 🌟 Remerciements

- [jsPDF](https://github.com/parallax/jsPDF) pour la génération de PDF
- La communauté Chrome Extensions pour la documentation

---

⭐ Si ce projet vous a été utile, n'hésitez pas à lui donner une étoile sur GitHub !
