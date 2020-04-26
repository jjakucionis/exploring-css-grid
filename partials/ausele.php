<div id="mmm">
  <div id="ooo"></div>
  <?php
    echo "<span>Pages:</span>";
    $files = scandir(getcwd());
    foreach($files as $file){
      if (!!strpos($file,'.php')){
        $noShows = ["ausele.php", "footer.php", "header.php", "requests.php"];
        $find = (array_search($file, $noShows) > -1) ? true : false;
        if (!$find) {
          echo '<a href="'.$file.'">'.$file.'</a>';
        }
      }
    }
  ?>
</div>

<style type="text/css">#mmm,#ooo{background:#0c0c0c}#iii,#ooo,#ooo:before{position:absolute}#mmm{position:fixed;width:260px;right:-260px;z-index:200;padding:15px 15px 15px 30px;top:0;height:100%;box-sizing:border-box}#mmm:hover{right:0}#iii{overflow-y:scroll;width:100%;top:20px;height:85%}#mmm a,#mmm span{text-decoration:none;font-size:14px;display:block;margin:5px 0}#mmm span{color:#757575;padding-top:10px}#mmm a{color:#fff;padding-left:15px}#mmm a:hover{text-decoration:underline}#ooo{width:30px;height:29px;bottom:0;left:-30px;border-bottom-left-radius:2px}#ooo:before{content:"";right:7px;display:block;width:16px;top:-1px;height:0;box-shadow:0 10px 0 1px #fff,0 16px 0 1px #fff,0 22px 0 1px #fff}</style>