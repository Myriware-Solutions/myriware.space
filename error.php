<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $_GET['err_code']; ?> Error | Myriware</title>
        <?php include "./assets/html/head.html" ?>
    </head>
    <body>
        <header><h1>Webpage Error</h1></header>
        <nav class="external"><?php include "./assets/html/navbar.html" ?></nav>
        <nav class="internal">Internal Navigation (Nowhere to go here!)</nav>
        <main>
            <h2>You Encoutered an <?php echo $_GET['err_code']; ?> Error!</h2>
            <p>Oh dear.</p>
        </main>
    </body>
</html>