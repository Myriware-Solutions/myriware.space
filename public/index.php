<?php $p_path = ".."; include "$p_path/source/php/global.php"; $LANG = $_GET['lang']; ?>
<!DOCTYPE html>
<html lang=<?php echo "\"$LANG\""; ?>>
    <head>
        <title>Myriware | Home</title>
<?php include "../source/html/head.html"; ?>
    </head>
    <body>
<?php include "../source/html/nav.php"; ?>
        <main>
<?php include "$p_path/docs/$LANG/index.php"; ?>

<?php include "../source/html/footer.php"; ?>
        </main>
    </body>
</html>