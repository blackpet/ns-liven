<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	div {color: red;}

	.ac {text-align: center; }

	.scenario {padding: 20px;}

</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Nongshim Live.N</h1>
<h2 class="ac">Realtime Interaction Study</h2>

<div class="ac">
	DB 연결이 되지 않은 샘플 프로그램 입니다.
</div>

<ol class="scenario">
	<li>강사와 학습자 간 실시간 연계 학습이 가능합니다.</li>
	<li>1. 강사
		<ol>
			<li> - tutor > Quiz 에 접속</li>
			<li> - [출제하기]</li>
			<li> - 출제 후 결과 화면으로 이동하여 학습자의 참여 결과를 실시간 모니터링</li>
			<li> - 학습자 참여 종료 후 [결과 공유하기]로 학습자에게 결과 전송</li>
		</ol>
	</li>
	<li>2. 학습자
		<ol>
			<li> - student 에 접속</li>
			<li> - 강사의 [출제하기] 대기</li>
			<li> - Quiz 정답 [제출하기]</li>
			<li> - 강사의 [결과 공유하기] 대기</li>
			<li> - 강사의 [결과 공유하기] 후 결과화면 확인</li>
		</ol>
	</li>
</ol>

