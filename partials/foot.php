  
  <?php if(!$localhost): ?>
  <script type="text/javascript" src="./assets/app.js"></script>
  <?php else: ?>
  <script type="text/javascript" src="http://localhost:5000/assets/app.js"></script>
  <?php endif; ?>
  <?php include 'ausele.php'; ?>
</body>
</html>
