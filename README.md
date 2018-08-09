# make_sortable (Beta)
Sortable Lists with Ecma Script 6

Example:

<script type="text/javascript" src="drag_and_drop_es6.js"></script>
<script>
	document.addEventListener('DOMContentLoaded', function() {
		makeSortable({
			container: 'ul.list1, ul.list2',
			containerClass: 'sortableContainer',
			overContainerClass: 'overSortableContainer'
		});
	});
</script>

<ul class="list1">
	<li>item 1</li>
	<li>item 2</li>
	<li>item 3</li>
	<li>item 4</li>
	<li>item 5</li>
</ul>
<ul class="list2">
	<li>item 6</li>
	<li>item 7</li>
	<li>item 8</li>
	<li>item 9</li>
	<li>item 10</li>
</ul>