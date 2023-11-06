        <nav>
            <ul>
<?php
$links = (json_decode(file_get_contents(__DIR__ . "/../autos/nav.json"), true))["links"];
foreach ($links as $link) {
    echo "                <li><a href=\"/". $_GET['lang'] . $link["path"] ."\">". $link["name"] ."</a></li>\n";
}
?>
            </ul>
        </nav>
