# Screenshot to PDF - Chrome Extension

![Version](https://img.shields.io/badge/version-1.1-blue.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen.svg)
![Manifest](https://img.shields.io/badge/manifest-v3-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Une extension Chrome pour capturer automatiquement plusieurs captures d'écran et les exporter en un seul fichier PDF.

## ⚡ Démarrage rapide

1. **Installez** l'extension (voir [Installation](#-installation))
2. **Ouvrez** la page web que vous souhaitez capturer
3. **Cliquez** sur l'icône de l'extension
4. **Configurez** (optionnel) : orientation, zone de capture, nombre de pages
5. **Lancez** avec "🚀 Démarrer la capture"
6. **Récupérez** votre PDF automatiquement téléchargé !

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
  - `chrome.storage.local` : Sauvegarde des préférences utilisateur
- **OffscreenCanvas** : Recadrage d'images dans le service worker
- **createImageBitmap** : Traitement d'images compatible avec les service workers

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

## ❓ FAQ (Questions Fréquentes)

### Comment définir une zone de capture ?
1. Cliquez sur "🎯 Définir la zone"
2. Une boîte de sélection apparaît sur la page
3. Redimensionnez et déplacez-la pour cadrer votre zone
4. Cliquez sur "✓ Valider la sélection"

### La zone de capture est-elle sauvegardée ?
Oui ! La zone que vous définissez est automatiquement sauvegardée et sera réutilisée pour toutes vos prochaines captures, même après redémarrage du navigateur.

### Comment revenir à la capture plein écran ?
Cliquez simplement sur le bouton "🗑️ Réinitialiser" dans la section "Zone de capture".

### Quelle orientation choisir ?
- **Paysage (🖼️)** : Recommandé pour les présentations, diaporamas horizontaux
- **Portrait (📱)** : Idéal pour les documents verticaux, captures mobiles

### L'extension fonctionne-t-elle sur tous les sites ?
Oui, l'extension fonctionne sur tous les sites web. Cependant, certains sites avec des protections spéciales peuvent bloquer l'injection de scripts pour la navigation automatique.

### Combien de captures puis-je faire ?
Vous pouvez capturer entre 1 et 200 pages. Pour des raisons de performance et de mémoire, il est recommandé de faire des lots de 50 captures maximum.

### Le PDF est-il compressé ?
Les captures sont en qualité PNG maximale. Le fichier PDF peut donc être volumineux. Pour réduire la taille, vous pouvez utiliser des outils de compression PDF en ligne après génération.

## 📝 Cas d'usage

Cette extension est particulièrement utile pour :
- **Exporter des présentations** Canva, Google Slides, PowerPoint en ligne en PDF
- **Capturer des diaporamas** avec une zone spécifique (sans les barres d'outils)
- **Créer des documentations visuelles** en capturant uniquement le contenu pertinent
- **Archiver des contenus web paginés** (livres en ligne, tutoriels, etc.)
- **Générer des PDF optimisés** sans éléments superflus (menus, sidebars, etc.)
- **Capturer des vidéos frame par frame** en définissant la zone du lecteur vidéo

## ⚙️ Permissions requises

- `activeTab` : Accès à l'onglet actif pour la capture
- `scripting` : Injection de scripts pour la navigation automatique
- `downloads` : Téléchargement du PDF généré
- `storage` : Sauvegarde des préférences (zone de capture, orientation)
- `<all_urls>` : Fonctionne sur tous les sites web

## 🐛 Problèmes connus & Solutions

### Problèmes
- Le délai entre les captures peut nécessiter un ajustement selon la vitesse de chargement des pages
- Certains sites peuvent bloquer l'injection de scripts
- La qualité des captures dépend de la résolution de l'écran

### Solutions recommandées
- **Pages lentes** : Augmentez le délai entre captures (2000-3000ms recommandé)
- **Zone mal positionnée après scroll** : Redéfinissez la zone après avoir scrollé à la position souhaitée
- **Captures floues** : Utilisez le zoom du navigateur à 100% pour une qualité optimale
- **Extension qui ne répond pas** : Rechargez l'extension dans `chrome://extensions/`

## ✨ Nouveautés (v1.1)

- 🎯 **Sélection de zone personnalisée** : Interface visuelle pour définir précisément la zone à capturer
- 📐 **Redimensionnement dynamique** : 8 poignées pour ajuster la zone avec précision
- 💾 **Persistance des réglages** : Vos préférences sont sauvegardées automatiquement
- 🎨 **Choix d'orientation** : PDF en mode Paysage ou Portrait
- 🔄 **Recadrage intelligent** : Utilisation d'APIs modernes (`createImageBitmap`, `OffscreenCanvas`)
- 🖼️ **Interface améliorée** : Popup agrandi (400px) pour une meilleure lisibilité
- 🗑️ **Réinitialisation facile** : Bouton pour revenir au mode plein écran

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**Ledoux Antoine**

- GitHub: [@Loayus](https://github.com/Loayus)

## 🌟 Remerciements

- [jsPDF](https://github.com/parallax/jsPDF) pour la génération de PDF
- La communauté Chrome Extensions pour la documentation

---

⭐ Si ce projet vous a été utile, n'hésitez pas à lui donner une étoile sur GitHub !
