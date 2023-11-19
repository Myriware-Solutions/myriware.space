<?php $p_path = "../.."; /*get path to the web dir*/ include "$p_path/source/php/global.php"; $LANG = $_GET['lang']; ?>
<?php $group = $_GET['group']; ?>
<!DOCTYPE html>
<html lang=<?php echo "\"$LANG\""; ?>>
    <head>
        <?php
        echo "<title>$group's Group</title>\n";
        echo "        <link rel='stylesheet' href='/groupdocs/$group.css'>\n";
        ?>
<?php include "$p_path/source/html/head.html"; ?>
    </head>
    <body>
<?php include "$p_path/source/html/nav.php"; ?>
        <main>
        <?php
        include "$p_path/groupdocs/$group.$LANG.html";
        ?>

<?php include "$p_path/source/html/footer.php"; ?>
        </main>
    </body>
</html>