<?php $p_path = "../.."; include "$p_path/source/php/global.php"; $LANG = $_GET['lang']; ?>
<!DOCTYPE html>
<html lang=<?php echo "\"$LANG\""; ?>>
    <head>
        <title>Banking | Myriware</title>
<?php include "$p_path/source/html/head.html"; ?>
    </head>
    <body>
<?php include "$p_path/source/html/nav.php"; ?>
        <main>
<?php include "$p_path/docs/$LANG/banking/index.html"; ?>
            <section>
                <p><?php echo $LANG; ?></p>
            </section>

<?php include "$p_path/source/html/footer.php"; ?>
        </main>
    </body>
</html>