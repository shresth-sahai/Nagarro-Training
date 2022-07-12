<? php 

$username=isset($_POST['username']) ? $_POST['username']:'';
$password=isset($_POST['password']) ? $_POST['password']:'';
$ok=true;
$messages=array();

if(!isset($password) || empty($password))
{
    $ok=false;
    $messages[]="password cannot be empty";
}
if(!isset($username) || empty($username))
{
    $ok=false;
    $messages[]="username cannot be empty";
}
if($ok)
{
    if($username== 'dcode' && $password==='decode'){
        $ok=true;
$messages[]='Success';
    }
    else{
        $ok=false;
$messages[]='Fail';
    }
}
echo json_encode(
    array(
        'ok'=> $ok,
        'messages' => $messages
    )
);
?>
