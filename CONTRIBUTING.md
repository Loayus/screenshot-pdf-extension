# Guide de Contribution

Merci de votre intérêt pour contribuer à Screenshot to PDF ! 🎉

## Comment contribuer

### Signaler un bug 🐛

Si vous trouvez un bug, veuillez ouvrir une issue en incluant :
- Une description claire du problème
- Les étapes pour reproduire le bug
- Le comportement attendu vs le comportement actuel
- Des captures d'écran si applicable
- Votre version de Chrome
- Le système d'exploitation utilisé

### Proposer une nouvelle fonctionnalité 💡

Pour proposer une nouvelle fonctionnalité :
1. Vérifiez d'abord qu'elle n'a pas déjà été proposée dans les issues
2. Ouvrez une nouvelle issue avec le tag "enhancement"
3. Décrivez clairement la fonctionnalité et son utilité
4. Si possible, proposez une implémentation ou des pistes de solution

### Soumettre une Pull Request 🔧

1. **Fork le projet**
   ```bash
   git clone https://github.com/VOTRE_USERNAME/screenshot-pdf-extension.git
   cd screenshot-pdf-extension
   ```

2. **Créez une branche**
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```

3. **Faites vos modifications**
   - Écrivez du code clair et commenté
   - Suivez le style de code existant
   - Testez vos modifications

4. **Committez vos changements**
   ```bash
   git add .
   git commit -m "feat: ajout de ma nouvelle fonctionnalité"
   ```
   
   Utilisez des messages de commit conventionnels :
   - `feat:` pour une nouvelle fonctionnalité
   - `fix:` pour une correction de bug
   - `docs:` pour la documentation
   - `style:` pour le formatage
   - `refactor:` pour la refactorisation
   - `test:` pour les tests
   - `chore:` pour les tâches de maintenance

5. **Poussez vers votre fork**
   ```bash
   git push origin feature/ma-nouvelle-fonctionnalite
   ```

6. **Ouvrez une Pull Request**
   - Allez sur le dépôt original sur GitHub
   - Cliquez sur "New Pull Request"
   - Sélectionnez votre branche
   - Décrivez vos modifications en détail

## Standards de code

### JavaScript
- Utilisez des noms de variables descriptifs
- Commentez le code complexe
- Gérez les erreurs proprement avec try/catch
- Utilisez `const` et `let`, évitez `var`
- Utilisez les fonctions async/await pour le code asynchrone

### Style
- Indentation : 2 espaces
- Pas de point-virgule obligatoire (mais soyez cohérent)
- Utilisez des guillemets simples pour les strings

### HTML/CSS
- Code HTML5 valide
- CSS organisé et commenté
- Noms de classes descriptifs

## Tests

Avant de soumettre votre PR, testez votre extension :
1. Chargez l'extension non empaquetée dans Chrome
2. Testez sur différents sites web
3. Vérifiez qu'il n'y a pas d'erreurs dans la console
4. Testez différentes configurations (nombre de captures, délais)

## Code de Conduite

- Soyez respectueux et bienveillant
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est meilleur pour la communauté
- Montrez de l'empathie envers les autres membres

## Questions ?

Si vous avez des questions, n'hésitez pas à :
- Ouvrir une issue avec le tag "question"
- Contacter les mainteneurs

Merci pour votre contribution ! 🙏
