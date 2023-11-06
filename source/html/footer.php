<?php
$lang_doc = (json_decode(file_get_contents(__DIR__ . "/../autos/langs.json"), true));
$lang = $lang_doc["langs"][$_GET['lang']];
$quip = $lang_doc["quips"][$_GET['lang']];
            ?><footer>
                <p>&copy; Myriware</p>
                <p><?php echo $quip .' '. $lang ?></p>
            </footer>
