<?php $p_path = ".."; /*get path to the web dir*/ include "$p_path/source/php/global.php"; $LANG = $_GET['lang']; ?>
<!DOCTYPE html>
<html lang=<?php echo "\"$LANG\""; ?>>
    <head>
        <title><!--TITLE--></title>
<?php include "$p_path/source/html/head.html"; ?>
    </head>
    <body>
<?php include "$p_path/source/html/nav.php"; ?>
        <main>
            <!--
                This area can be contained in a 
                FILENAME.html in the docs dirrectory.
                Make sure it still has the <header>,
                along with all the needed <section>s
            -->
            <header>
                <!--HEADER-->
            </header>
            
            <!--SECTIONS-->

<?php include "$p_path/source/html/footer.php"; ?>
        </main>
    </body>
</html>