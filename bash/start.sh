#!/bin/sh

# Anyconnect bin file
ANY_CONNECT=/opt/cisco/anyconnect/bin/vpn
# File contains username, password; will be read by Any Connect
# Copy and rename .vpn_example to HOME folder, then change your Username and Password
VPN_AUTH=~/.vpn
# vpn host without scheme
VPN_SERVER=$1
PASSHEAD=$2

EXCHANGE_URL=https://localhost/api/getrsa


# start web
echo "Run web in background"
sh bash/start_web.sh > output.log &

curl -s -k $EXCHANGE_URL > null

action=""
sp="/-\|"

# trap ctrl-c and call ctrl_c()
trap ctrl_c INT

function ctrl_c() {
	echo "Disconnecting"
    $ANY_CONNECT disconnect
	echo "Kill web"
	kill %1
	exit 0
}

function connect {
	echo $1
	sed s/_PASSCODE_/$1/ $VPN_AUTH | $ANY_CONNECT -s connect $VPN_SERVER

}

function check_connect {
	
	
	nxt=$($ANY_CONNECT status | grep -c "state: Connected")
	i=1
	#printf "Check connect:"
	while [ "$nxt" == "3" ]
	do
		sleep $1
		printf "\b\b\b\b\b\b\b\b\b\b\b\b\b\bStill connect \b${sp:i++%${#sp}:1}"
		nxt=$($ANY_CONNECT status | grep -c "state: Connected")
		#echo $nxt
	done
}


function connect_loop {
	
	printf "Check connect:"
	check_connect 10

	if [ "$1" = "" ]; then
		pc=""
		i=1
		printf "\nWaiting new passcode  "
		while [ "$pc" == "" ]
		do
    			printf "\b${sp:i++%${#sp}:1}"
			sleep 0.5
    			pc=$(curl -s -k $EXCHANGE_URL)
			#pc=$(curl -s -k https://localhost/api/getrsa)
			#echo "waiting new passcode..."
			printf "\b${sp:i++%${#sp}:1}"
    			sleep 0.5
			check_connect 0.5
		done
		passcode="${PASSHEAD}${pc}"
	else
		passcode="${PASSHEAD}$1"
		#sed s/_PASSCODE_/$passcode/ ~/.vpn > output
	fi

	connect $passcode

	
	connect_loop $1 $2
}


if [ "$1" = "status" ] || [ "$1" = "disconnect" ]; then
	action=$1
else

	if ! (( $($ANY_CONNECT status | grep -c "state: Connected")==0 )) ; then
		echo "Still connected"
		#exit 0
	fi
	
fi



if [ "$action" != "" ]; then
	echo "here"
	$ANY_CONNECT $action
else

	connect_loop $1

fi
